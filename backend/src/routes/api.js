import express from 'express';
import { submitFeedback } from '../controllers/feedbackController.js';
import { getMatches } from '../controllers/matchesController.js';
import { switchTherapist } from '../controllers/switchController.js';

const router = express.Router();

// POST /api/feedback
router.post('/feedback', submitFeedback);

// GET /api/matches
router.get('/matches', getMatches);

// POST /api/switch
router.post('/switch', switchTherapist);

export default router;

