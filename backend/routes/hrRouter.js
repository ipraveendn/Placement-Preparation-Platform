import express from 'express';
import { createHr, loginHr } from '../controllers/hrController.js';
import adminAuth from '../middleware/adminAuth.js';

const hrRouter = express.Router();
hrRouter.post('/',adminAuth, createHr); // POST /api/hr
hrRouter.post('/login', loginHr);

export default hrRouter;
