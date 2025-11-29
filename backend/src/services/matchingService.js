/**
 * Calculate match score for a therapist based on user preferences
 */
export function calculateMatchScore(therapist, userPreferences) {
  let score = 0;
  
  // Specialty match (+2)
  if (userPreferences?.specialty && Array.isArray(userPreferences.specialty)) {
    const hasMatchingSpecialty = userPreferences.specialty.some(
      pref => therapist.specialties?.includes(pref)
    );
    if (hasMatchingSpecialty) score += 2;
  }
  
  // Modality match (+1)
  if (userPreferences?.modality && Array.isArray(userPreferences.modality)) {
    const hasMatchingModality = userPreferences.modality.some(
      pref => therapist.modalities?.includes(pref)
    );
    if (hasMatchingModality) score += 1;
  }
  
  // Availability match (+1)
  if (userPreferences?.time && Array.isArray(userPreferences.time)) {
    const hasMatchingAvailability = userPreferences.time.some(
      pref => therapist.availability?.includes(pref)
    );
    if (hasMatchingAvailability) score += 1;
  }
  
  // Gender match (+1)
  if (userPreferences?.gender) {
    const userGender = userPreferences.gender;
    const therapistGender = therapist.gender;
    
    // Skip matching if user prefers not to say
    if (userGender === 'Prefer not to say' || userGender === 'No preference') {
      // Don't penalize for gender preference
    }
    // Exact match - works for all gender options
    else if (userGender === therapistGender) {
      score += 1;
    }
  }

  // LGBTQIA+ affirming match (+1)
  // This is a separate preference/qualifier, not a gender
  if (userPreferences?.lgbtqia_affirming && therapist.lgbtqia_affirming) {
    score += 1;
  }
  
  return score;
}

/**
 * Get top 3 matched therapists for a user
 */
export async function getTopMatches(userId, supabase) {
  // Get user data
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (userError || !user) {
    throw new Error('User not found');
  }

  const currentTherapistId = user.therapist_id;
  const preferences = user.preferences || {};

  // Get all therapists except current one
  let query = supabase
    .from('therapists')
    .select('*');

  if (currentTherapistId) {
    query = query.neq('id', currentTherapistId);
  }

  const { data: allTherapists, error: therapistsError } = await query;

  if (therapistsError) {
    throw new Error('Failed to fetch therapists');
  }

  // If no preferences, return top 3 by rating
  if (!preferences || Object.keys(preferences).length === 0) {
    return allTherapists
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 3)
      .map(therapist => ({
        ...therapist,
        match_score: 0
      }));
  }

  // Calculate scores for each therapist
  const matches = allTherapists.map(therapist => ({
    therapist,
    score: calculateMatchScore(therapist, preferences)
  }));

  // Sort by score (desc), then by rating (desc), then by id (asc)
  matches.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    const ratingDiff = (b.therapist.rating || 0) - (a.therapist.rating || 0);
    if (ratingDiff !== 0) {
      return ratingDiff;
    }
    return a.therapist.id - b.therapist.id;
  });

  // Return top 3 with match scores
  return matches.slice(0, 3).map(m => ({
    ...m.therapist,
    match_score: m.score
  }));
}

