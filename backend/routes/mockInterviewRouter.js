import express from 'express';
import {
    requestMockInterview,
    getHRInterviews,
    submitInterviewScores,
    getUserInterviews
} from '../controllers/mockInterviewController.js';
import authUser from '../middleware/auth.js';
import { hrAuth } from '../middleware/hrAuth.js';

const router = express.Router();

// User routes
router.post('/request', authUser, requestMockInterview);
router.get('/user-history', authUser, getUserInterviews);

// HR routes
router.get('/hr-interviews', hrAuth, getHRInterviews);
router.post('/submit-scores/:interviewId', hrAuth, submitInterviewScores);

export default router; 