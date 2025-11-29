/**
 * Get user by ID
 */
export async function getUserById(userId, supabase) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    throw new Error('User not found');
  }

  return data;
}

/**
 * Update user's therapist assignment
 */
export async function updateUserTherapist(userId, therapistId, supabase) {
  const { data, error } = await supabase
    .from('users')
    .update({ therapist_id: therapistId })
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    throw new Error('Failed to update therapist assignment');
  }

  return data;
}

/**
 * Get therapist by ID
 */
export async function getTherapistById(therapistId, supabase) {
  const { data, error } = await supabase
    .from('therapists')
    .select('*')
    .eq('id', therapistId)
    .single();

  if (error) {
    throw new Error('Therapist not found');
  }

  return data;
}

