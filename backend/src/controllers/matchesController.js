import { getTopMatches } from '../services/matchingService.js';
import { supabase } from '../config/database.js';

/**
 * GET /api/matches
 * Return top 3 therapist matches
 */
export async function getMatches(req, res, next) {
  try {
    const userId = parseInt(req.query.userId);

    if (!userId || isNaN(userId)) {
      return res.status(400).json({
        status: 'error',
        message: 'userId query parameter is required and must be a number',
        code: 'MISSING_USER_ID'
      });
    }

    const therapists = await getTopMatches(userId, supabase);

    return res.status(200).json({
      therapists
    });

  } catch (error) {
    if (error.message === 'User not found') {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }
    next(error);
  }
}

