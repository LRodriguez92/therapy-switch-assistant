import { updateUserTherapist, getTherapistById } from '../services/userService.js';
import { supabase } from '../config/database.js';

/**
 * POST /api/switch
 * Assign new therapist to user
 */
export async function switchTherapist(req, res, next) {
  try {
    const { userId, therapistId } = req.body;

    // Validation
    if (!userId || !therapistId) {
      return res.status(400).json({
        status: 'error',
        message: 'userId and therapistId are required',
        code: 'MISSING_FIELDS'
      });
    }

    // Verify therapist exists
    const therapist = await getTherapistById(therapistId, supabase);

    // Update user's therapist assignment
    await updateUserTherapist(userId, therapistId, supabase);

    // Return success response with therapist info
    return res.status(200).json({
      status: 'success',
      message: 'Your therapist has been switched successfully.',
      therapist: {
        id: therapist.id,
        name: therapist.name,
        specialties: therapist.specialties,
        modalities: therapist.modalities,
        availability: therapist.availability
      }
    });

  } catch (error) {
    if (error.message === 'User not found' || error.message === 'Therapist not found') {
      return res.status(404).json({
        status: 'error',
        message: error.message,
        code: 'NOT_FOUND'
      });
    }
    next(error);
  }
}

