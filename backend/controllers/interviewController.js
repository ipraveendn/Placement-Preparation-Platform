import Interview from '../models/interview.js';
import nodemailer from 'nodemailer';

// Create a new interview entry
export const createInterview = async (req, res) => {
    try {
        const { type, position, date, time, interviewType, difficulty, duration } = req.body;

        if (!type || !position) {
            return res.status(400).json({ error: 'Type and position are required' });
        }

        // Validation based on type
        if (type === 'HR' && (!date || !time)) {
            return res.status(400).json({ error: 'Date and time are required for HR interview' });
        }

        if (type === 'AI' && (!interviewType || !difficulty || !duration)) {
            return res.status(400).json({ error: 'Interview Type, Difficulty, and Duration are required for AI interview' });
        }

        // Save to database
        const interview = new Interview({
            type,
            position,
            date,
            time,
            interviewType,
            difficulty,
            duration,
            score: '', // initialize empty score
        });

        await interview.save();

        // If HR interview, send email to HR
        if (type === 'HR') {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: 'actualhr@email.com', // Replace with HR's email
                subject: `New HR Interview Scheduled - ${position}`,
                text: `A new HR interview has been scheduled:\n\nPosition: ${position}\nDate: ${date}\nTime: ${time}`,
            };

            await transporter.sendMail(mailOptions);
        }

        res.status(201).json({ message: 'Interview saved and HR notified (if HR type).', interview });

    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
};





// Get all interviews
export const getAllInterviews = async (req, res) => {
    try {
        const interviews = await Interview.find().sort({ date: -1 });
        res.status(200).json(interviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



export const getInterviewCount = async (req, res) => {
    try {
        const count = await Interview.countDocuments();
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
