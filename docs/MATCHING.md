# Matching Logic

## Overview

A lightweight scoring algorithm that matches users with therapists based on preferences, specialties, modalities, and availability.

## Matching Score Algorithm

The algorithm calculates a match score for each therapist based on how well they align with the user's preferences.

### Scoring Rules

| Criteria | Points | Description |
|----------|--------|-------------|
| Specialty Match | +2 | If user's preferred specialty is in therapist's specialties |
| Modality Match | +1 | If user's preferred modality is in therapist's modalities |
| Availability Match | +1 | If user's preferred time overlaps with therapist's availability |
| Gender Match | +1 | If therapist's gender exactly matches user's preference (exact string match) |
| LGBTQIA+ Affirming Match | +1 | If user prefers LGBTQIA+-affirming therapists and therapist is LGBTQIA+-affirming |

**Maximum Score:** 6 points

**Gender Matching Notes:**
- Uses exact string matching (e.g., "Female" matches "Female", "Non-binary" matches "Non-binary")
- If user selects "Prefer not to say" or "No preference", gender matching is skipped (no penalty)
- Custom gender entries (e.g., "Other: [text]") must match exactly

## Algorithm Pseudocode

```
function getMatches(userId):
  user = getUser(userId)
  currentTherapistId = user.therapist_id
  preferences = user.preferences
  
  allTherapists = getAllTherapists()
  matches = []
  
  for each therapist in allTherapists:
    // Skip current therapist
    if therapist.id === currentTherapistId:
      continue
    
    score = 0
    
    // Check specialty match (+2 points)
    if preferences.specialty exists:
      for each preferredSpecialty in preferences.specialty:
        if preferredSpecialty in therapist.specialties:
          score += 2
          break // Only count once
    
    // Check modality match (+1 point)
    if preferences.modality exists:
      for each preferredModality in preferences.modality:
        if preferredModality in therapist.modalities:
          score += 1
          break // Only count once
    
    // Check availability match (+1 point)
    if preferences.time exists:
      for each preferredTime in preferences.time:
        if preferredTime in therapist.availability:
          score += 1
          break // Only count once
    
    // Check gender match (+1 point)
    if preferences.gender exists:
      if preferences.gender === "Prefer not to say" or preferences.gender === "No preference":
        // Skip gender matching - no penalty
      else if preferences.gender === therapist.gender:
        score += 1
    
    // Check LGBTQIA+ affirming match (+1 point)
    if preferences.lgbtqia_affirming exists and preferences.lgbtqia_affirming === true:
      if therapist.lgbtqia_affirming === true:
        score += 1
    
    matches.append({
      therapist: therapist,
      score: score
    })
  
  // Sort by score descending, then by rating descending
  sort matches by (score DESC, therapist.rating DESC)
  
  // Return top 3
  return matches.slice(0, 3)
```

## Implementation Example (JavaScript)

```javascript
function calculateMatchScore(therapist, userPreferences) {
  let score = 0;
  
  // Specialty match (+2)
  if (userPreferences.specialty) {
    const hasMatchingSpecialty = userPreferences.specialty.some(
      pref => therapist.specialties.includes(pref)
    );
    if (hasMatchingSpecialty) score += 2;
  }
  
  // Modality match (+1)
  if (userPreferences.modality) {
    const hasMatchingModality = userPreferences.modality.some(
      pref => therapist.modalities.includes(pref)
    );
    if (hasMatchingModality) score += 1;
  }
  
  // Availability match (+1)
  if (userPreferences.time) {
    const hasMatchingAvailability = userPreferences.time.some(
      pref => therapist.availability.includes(pref)
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

function getTopMatches(userId) {
  const user = getUser(userId);
  const currentTherapistId = user.therapist_id;
  const preferences = user.preferences || {};
  
  const allTherapists = getAllTherapists()
    .filter(t => t.id !== currentTherapistId);
  
  const matches = allTherapists.map(therapist => ({
    therapist,
    score: calculateMatchScore(therapist, preferences)
  }));
  
  // Sort by score (desc), then by rating (desc)
  matches.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return b.therapist.rating - a.therapist.rating;
  });
  
  return matches.slice(0, 3).map(m => ({
    ...m.therapist,
    match_score: m.score
  }));
}
```

## Example Calculation

**User Preferences:**
```json
{
  "specialty": ["Anxiety"],
  "modality": ["CBT"],
  "time": ["Evenings"],
  "gender": "Female",
  "lgbtqia_affirming": true
}
```

**Therapist A:**
- Specialties: `["Anxiety", "Depression"]`
- Modalities: `["CBT", "EMDR"]`
- Availability: `["Evenings", "Weekends"]`
- Gender: `"Female"`
- LGBTQIA+ Affirming: `true`

**Score Calculation:**
- Specialty match: ✅ "Anxiety" found → +2
- Modality match: ✅ "CBT" found → +1
- Availability match: ✅ "Evenings" found → +1
- Gender match: ✅ "Female" matches → +1
- LGBTQIA+ affirming match: ✅ Both true → +1
- **Total Score: 6**

**Therapist B:**
- Specialties: `["Depression", "Trauma"]`
- Modalities: `["DBT"]`
- Availability: `["Mornings"]`
- Gender: `"Male"`
- LGBTQIA+ Affirming: `false`

**Score Calculation:**
- Specialty match: ❌ "Anxiety" not found → +0
- Modality match: ❌ "CBT" not found → +0
- Availability match: ❌ "Evenings" not found → +0
- Gender match: ❌ "Male" doesn't match → +0
- LGBTQIA+ affirming match: ❌ User wants affirming, therapist is not → +0
- **Total Score: 0**

## Edge Cases

### No Preferences Set
If user has no preferences, return therapists sorted by rating only:
```javascript
if (!preferences || Object.keys(preferences).length === 0) {
  return allTherapists
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);
}
```

### Ties in Score
When multiple therapists have the same score, use secondary sorting:
1. Primary: Match score (descending)
2. Secondary: Therapist rating (descending)
3. Tertiary: Therapist ID (ascending, for consistency)

### Insufficient Matches
If fewer than 3 therapists are available, return all available matches.

## Future Enhancements

The current algorithm is simple and effective, but can be extended with:

1. **Machine Learning**: Train a model on successful matches
2. **Weighted Preferences**: Allow users to prioritize certain preferences
3. **Historical Data**: Consider past successful matches
4. **Location/Time Zone**: Match based on geographic proximity
5. **Language Preferences**: Match based on spoken languages
6. **Insurance Compatibility**: Match based on accepted insurance plans
7. **Price Range**: Match based on session cost

## Testing

Test cases to consider:

1. **Perfect Match**: All preferences match → Score = 6
2. **Partial Match**: Some preferences match → Score = 1-5
3. **No Match**: No preferences match → Score = 0
4. **Gender Preference Not Set**: User selects "Prefer not to say" → Gender matching skipped, max score = 5
4. **Missing Preferences**: User has no preferences → Sort by rating
5. **Current Therapist Exclusion**: Current therapist not in results
6. **Empty Database**: Handle gracefully when no therapists available

