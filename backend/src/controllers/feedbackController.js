import { supabase } from '../config/database.js';
import { getUserById } from '../services/userService.js';

/**
 * POST /api/feedback
 * Store session feedback and detect dissatisfaction
 */
export async function submitFeedback(req, res, next) {
  try {
    const { userId, rating, comment } = req.body;

    // Validation
    if (!userId || !rating) {
      return res.status(400).json({
        status: 'error',
        message: 'userId and rating are required',
        code: 'MISSING_FIELDS'
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        status: 'error',
        message: 'Rating must be between 1 and 5',
        code: 'INVALID_RATING'
      });
    }

    // Verify user exists
    const user = await getUserById(userId, supabase);
    const therapistId = user.therapist_id;

    if (!therapistId) {
      return res.status(400).json({
        status: 'error',
        message: 'User has no assigned therapist',
        code: 'NO_THERAPIST'
      });
    }

    // Save feedback
    const { error: feedbackError } = await supabase
      .from('session_feedback')
      .insert({
        user_id: userId,
        therapist_id: therapistId,
        rating: rating,
        comment: comment || null,
        created_at: new Date().toISOString()
      });

    if (feedbackError) {
      throw new Error('Failed to save feedback');
    }

    // Check if low rating (≤ 3)
    if (rating <= 3) {
      return res.status(200).json({
        status: 'low_rating',
        next: '/api/matches',
        message: "We're sorry this session didn't feel like a good fit."
      });
    }

    // High rating response
    return res.status(200).json({
      status: 'success',
      message: 'Thank you for your feedback!'
    });

  } catch (error) {
    next(error);
  }
}

