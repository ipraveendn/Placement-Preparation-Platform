import dotenv from 'dotenv';
dotenv.config();


import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRouter.js';
import connectDB from './config/mongodb.js';
import interviewRouter from './routes/interviewRouter.js';
import hrRouter from './routes/hrRouter.js';
import adminRouter from './routes/adminRouter.js';
import mockInterviewRouter from './routes/mockInterviewRouter.js';

const app=express();
const port = process.env.PORT || 4000;
connectDB();


// CORS configuration
app.use(cors({
    origin: 'http://localhost:5174', // Your frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


// middlewares
app.use(express.json());

// api endpoints
app.use('/api/admin', adminRouter);
app.use("/api/user",userRouter);
app.use("/api/interview",interviewRouter)
app.use("/api/hr",hrRouter)
app.use("/api/mock-interview", mockInterviewRouter);

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



// listen
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});