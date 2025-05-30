import express from 'express';
import { createInterview, getAllInterviews } from '../controllers/interviewController.js';

const interviewRouter = express.Router();

interviewRouter.post('/', createInterview);
interviewRouter.get('/', getAllInterviews);

export default interviewRouter;
