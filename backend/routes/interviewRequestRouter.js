import express from 'express';
import { submitInterviewRequest, getPendingInterviewRequests, acceptInterviewRequest, getAllInterviewRequests, getUpcomingInterviewRequestsForHr, getUserCompletedInterviews, rejectInterviewRequest } from '../controllers/interviewRequestController.js';
import authUser from '../middleware/auth.js'; // Assuming you have a user auth middleware
import { hrAuth } from '../middleware/hrAuth.js'; // Assuming you have an HR auth middleware
import adminAuth from '../middleware/adminAuth.js'; // Assuming you have an Admin auth middleware

const interviewRequestRouter = express.Router();

console.log('Interview Request Router loaded.');

// Route for user to submit an interview request
interviewRequestRouter.post('/submit', authUser, submitInterviewRequest);

// Route for HR to fetch pending interview requests
interviewRequestRouter.get('/pending', hrAuth, getPendingInterviewRequests);

// Route for HR to accept an interview request
interviewRequestRouter.post('/accept', hrAuth, acceptInterviewRequest);

// Route for HR to reject an interview request
interviewRequestRouter.post('/reject', hrAuth, rejectInterviewRequest);

// Route for Admin to fetch all interview requests
interviewRequestRouter.get('/all', adminAuth, getAllInterviewRequests);

// Route for HR to fetch their upcoming (accepted) interview requests
interviewRequestRouter.get('/upcoming', hrAuth, getUpcomingInterviewRequestsForHr);

// Route for users to fetch their completed interviews with scores
interviewRequestRouter.get('/user/completed', authUser, getUserCompletedInterviews);

export default interviewRequestRouter; 