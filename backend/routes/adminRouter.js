import express from 'express';
import adminAuth from '../middleware/adminAuth.js';
import { adminLogin } from '../controllers/userControllers.js';
import { getAllHRs, getHRCount } from '../controllers/hrController.js';
import { getInterviewCount } from '../controllers/interviewController.js';

const adminRouter = express.Router();

// Public route for admin login
adminRouter.post('/login', adminLogin);

// Example protected admin route (just for demonstration)
adminRouter.get('/dashboard', adminAuth, (req, res) => {
    res.json({ message: 'Welcome to admin dashboard' });
});

// Protected route to get total HR count
adminRouter.get('/hr-count', adminAuth, getHRCount);

// Protected route to get total interview count
adminRouter.get('/interview-count', adminAuth, getInterviewCount);

// Protected route to get total HR Detsils
adminRouter.get('/hrs', adminAuth, getAllHRs);

export default adminRouter;
