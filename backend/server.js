import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routes/userRouter.js';
import connectDB from './config/mongodb.js';
import interviewRouter from './routes/interviewRouter.js';
import hrRouter from './routes/hrRouter.js';
import adminRouter from './routes/adminRouter.js';
import mockInterviewRouter from './routes/mockInterviewRouter.js';
import interviewRequestRouter from './routes/interviewRequestRouter.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRouter);
app.use('/api/interviews', interviewRouter);
app.use('/api/hr', hrRouter);
app.use('/api/admin', adminRouter);
app.use('/api/mock-interview', mockInterviewRouter);
app.use('/api/interview-request', interviewRequestRouter);

app.get("/", (req, res) => {
    res.send("Api is working");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});