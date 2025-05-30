import MockInterview from '../models/mockInterview.js';
import HR from '../models/hr.js';
import User from '../models/userModel.js';

// Request a mock interview
export const requestMockInterview = async (req, res) => {
    try {
        const { position, date, time, mode, platform, venue } = req.body;
        const userId = req.user.id; // From auth middleware

        // Find available HRs
        const availableHRs = await HR.find({});
        if (availableHRs.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No HRs available at the moment'
            });
        }

        // Randomly select an HR
        const randomHR = availableHRs[Math.floor(Math.random() * availableHRs.length)];

        const mockInterview = new MockInterview({
            userId,
            hrId: randomHR._id,
            position,
            date,
            time,
            mode,
            platform: mode === 'online' ? platform : undefined,
            venue: mode === 'offline' ? venue : undefined
        });

        await mockInterview.save();

        res.status(201).json({
            success: true,
            message: 'Mock interview requested successfully',
            data: mockInterview
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get HR's assigned interviews
export const getHRInterviews = async (req, res) => {
    try {
        const hrId = req.user.id; // From auth middleware

        const interviews = await MockInterview.find({ hrId })
            .populate('userId', 'name email')
            .sort({ date: 1, time: 1 });

        res.status(200).json({
            success: true,
            data: interviews
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Submit interview scores and feedback
export const submitInterviewScores = async (req, res) => {
    try {
        const { interviewId } = req.params;
        const { scores, feedback } = req.body;
        const hrId = req.user.id; // From auth middleware

        const interview = await MockInterview.findOne({ _id: interviewId, hrId });
        if (!interview) {
            return res.status(404).json({
                success: false,
                message: 'Interview not found'
            });
        }

        // Calculate overall score
        const overall = Math.round(
            (scores.technical + scores.communication + scores.problemSolving) / 3
        );

        interview.scores = { ...scores, overall };
        interview.feedback = feedback;
        interview.status = 'completed';

        await interview.save();

        res.status(200).json({
            success: true,
            message: 'Scores submitted successfully',
            data: interview
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get user's interview history
export const getUserInterviews = async (req, res) => {
    try {
        const userId = req.user.id; // From auth middleware

        const interviews = await MockInterview.find({ userId })
            .populate('hrId', 'name email department')
            .sort({ date: -1, time: -1 });

        res.status(200).json({
            success: true,
            data: interviews
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}; 