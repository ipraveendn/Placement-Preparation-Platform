import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import userRouter from './routes/userRouter.js';
import connectDB from './config/mongodb.js';

const app=express();
const port = process.env.PORT || 4000;
connectDB();


// middlewares
app.use(express.json());
app.use(cors());

// api endpoints
app.use("/api/user",userRouter);

app.get("/", (req, res) => {
    res.send("Api is working");
});

// listen
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});