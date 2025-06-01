import InterviewRequestModel from '../models/interviewRequestModel.js';
import userModel from '../models/userModel.js';
import sendEmail from '../utils/sendEmail.js'; // Import the email utility

// Controller to handle a user submitting an interview request
const submitInterviewRequest = async (req, res) => {
    try {
        const { position, date, time, mode, platform, venue } = req.body;
        const userId = req.user.id;

        // Enhanced validation
        if (!position || !date || !time || !mode) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: position, date, time, and mode are required"
            });
        }

        // Validate date format and is not in the past
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time part for accurate date comparison

        if (isNaN(selectedDate.getTime())) {
            return res.status(400).json({
                success: false,
                message: "Invalid date format"
            });
        }

        if (selectedDate < today) {
            return res.status(400).json({
                success: false,
                message: "Interview date cannot be in the past"
            });
        }

        // Validate time format (HH:mm)
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timeRegex.test(time)) {
            return res.status(400).json({
                success: false,
                message: "Invalid time format. Please use HH:mm format (e.g., 14:30)"
            });
        }

        // Validate mode-specific fields
        if (mode === 'online' && !platform) {
            return res.status(400).json({
                success: false,
                message: "Platform is required for online interviews"
            });
        }

        if (mode === 'offline' && !venue) {
            return res.status(400).json({
                success: false,
                message: "Venue is required for offline interviews"
            });
        }

        // Check if user exists
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Check for existing pending requests
        const existingRequest = await InterviewRequestModel.findOne({
            userId,
            status: 'pending'
        });

        if (existingRequest) {
            return res.status(400).json({
                success: false,
                message: "You already have a pending interview request"
            });
        }

        const newRequest = new InterviewRequestModel({
            userId,
            position,
            date,
            time,
            mode,
            platform: mode === 'online' ? platform : undefined,
            venue: mode === 'offline' ? venue : undefined,
            status: 'pending'
        });

        await newRequest.save();

        // Send confirmation email to user
        try {
            const emailSubject = 'Interview Request Received';
            const emailText = `Dear ${user.name},\n\nYour interview request has been received and is pending approval.\n\nDetails:\nPosition: ${position}\nDate: ${date}\nTime: ${time}\nMode: ${mode}\n${mode === 'online' ? `Platform: ${platform}` : `Venue: ${venue}`}\n\nWe will notify you once an HR accepts your request.\n\nBest regards,\nThe Placement Preparation Platform Team`;

            await sendEmail(user.email, emailSubject, emailText);
        } catch (emailError) {
            console.error('Failed to send confirmation email:', emailError);
            // Don't fail the request if email fails
        }

        res.status(201).json({
            success: true,
            message: "Interview request submitted successfully",
            data: newRequest
        });

    } catch (error) {
        console.error('Error submitting interview request:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// Controller to handle HR fetching pending interview requests
const getPendingInterviewRequests = async (req, res) => {
    try {
        const pendingRequests = await InterviewRequestModel.find({ status: 'pending' })
            .populate('userId', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: pendingRequests
        });

    } catch (error) {
        console.error('Error fetching pending requests:', error);
        res.status(500).json({
            success: false,
            message: "Error fetching pending interview requests"
        });
    }
};

// Controller to handle HR accepting an interview request
const acceptInterviewRequest = async (req, res) => {
    try {
        const { requestId } = req.body;
        const hrId = req.user.id;

        const request = await InterviewRequestModel.findById(requestId)
            .populate('userId', 'name email');

        if (!request) {
            return res.status(404).json({
                success: false,
                message: "Interview request not found"
            });
        }

        if (request.status !== 'pending') {
            return res.status(400).json({
                success: false,
                message: "Request is not pending"
            });
        }

        // Update request status and assign HR
        request.status = 'accepted';
        request.hrId = hrId;
        await request.save();

        // Send acceptance email to user
        try {
            const emailSubject = 'Your Interview Request Has Been Accepted!';
            const emailText = `Dear ${request.userId.name},\n\nYour interview request has been accepted!\n\nDetails:\nPosition: ${request.position}\nDate: ${request.date}\nTime: ${request.time}\nMode: ${request.mode}\n${request.mode === 'online' ? `Platform: ${request.platform}` : `Venue: ${request.venue}`}\n\nPlease prepare accordingly.\n\nBest regards,\nThe Placement Preparation Platform Team`;

            await sendEmail(request.userId.email, emailSubject, emailText);
        } catch (emailError) {
            console.error('Failed to send acceptance email:', emailError);
            // Don't fail the request if email fails
        }

        res.status(200).json({
            success: true,
            message: "Interview request accepted successfully",
            data: request
        });

    } catch (error) {
        console.error('Error accepting interview request:', error);
        res.status(500).json({
            success: false,
            message: "Error accepting interview request"
        });
    }
};

// Controller to handle HR rejecting an interview request
const rejectInterviewRequest = async (req, res) => {
    try {
        const { requestId, reason } = req.body;

        const request = await InterviewRequestModel.findById(requestId).populate('userId', 'name email'); // Populate user details for email

        if (!request) {
            return res.json({ success: false, message: "Interview request not found." });
        }

        if (request.status !== 'pending') {
            return res.json({ success: false, message: "Request is not pending." });
        }

        // Update request status and optionally add a reason
        request.status = 'rejected';
        request.adminNotes = `Rejected by HR. Reason: ${reason || 'No reason provided.'}`; // Using adminNotes to store rejection reason for now
        await request.save();

        // Email Sending Logic
         if (request.userId && request.userId.email) {
            const emailSubject = 'Update on Your Interview Request';
            const emailText = `Dear ${request.userId.name},\n\nYour interview request for the position of ${request.position} on ${request.date} at ${request.time} has been reviewed and could not be accepted at this time.\n\nReason: ${reason || 'No reason provided.'}\n\nWe encourage you to submit another request if you wish.\n\nBest regards,\nThe Placement Preparation Platform Team`;

            // Send email
            await sendEmail(request.userId.email, emailSubject, emailText);
             console.log(`Rejection email sent to ${request.userId.email}`);
        }

        res.json({ success: true, message: "Interview request rejected successfully!" });

    } catch (error) {
        console.error('Error rejecting interview request:', error);
        res.json({ success: false, message: "Error rejecting interview request." });
    }
};

// Controller to handle Admin fetching all interview requests
const getAllInterviewRequests = async (req, res) => {
    try {
        const allRequests = await InterviewRequestModel.find({})
            .populate('userId', 'name email')
            .populate('hrId', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: allRequests
        });

    } catch (error) {
        console.error('Error fetching all requests:', error);
        res.status(500).json({
            success: false,
            message: "Error fetching all interview requests"
        });
    }
};

// Controller to handle HR fetching accepted interview requests
const getUpcomingInterviewRequestsForHr = async (req, res) => {
    try {
        const hrId = req.user.id;

        const upcomingRequests = await InterviewRequestModel.find({ hrId, status: 'accepted' })
            .populate('userId', 'name email')
            .sort({ date: 1, time: 1 }); // Sort by date and time

        res.status(200).json({
            success: true,
            data: upcomingRequests
        });

    } catch (error) {
        console.error('Error fetching upcoming requests for HR:', error);
        res.status(500).json({
            success: false,
            message: "Error fetching upcoming interview requests for HR"
        });
    }
};

// Controller to handle HR submitting feedback and scores for a completed interview
const submitInterviewFeedback = async (req, res) => {
    try {
        const { requestId, scores, feedback } = req.body;
        const hrId = req.user.id; // Assuming hrAuth middleware adds user to req

        const request = await InterviewRequestModel.findOne({ _id: requestId, hrId });

        if (!request) {
            return res.status(404).json({
                success: false,
                message: "Interview request not found or not assigned to this HR"
            });
        }

        // You might want to add validation for scores here (e.g., 0-100 range)

        request.scores = scores;
        request.feedback = feedback;
        request.status = 'completed'; // Mark as completed after feedback

        await request.save();

        // Optional: Send email to user with feedback and scores
        try {
            const user = await userModel.findById(request.userId);
            if (user && user.email) {
                const emailSubject = 'Feedback for Your Mock Interview';
                const emailText = `Dear ${user.name},\n\nHere is the feedback for your mock interview for the position of ${request.position}:\n\nTechnical Score: ${scores.technical}\nCommunication Score: ${scores.communication}\nProblem Solving Score: ${scores.problemSolving}\n\nHR Feedback:\n${feedback}\n\nKeep practicing!\n\nBest regards,\nThe Placement Preparation Platform Team`;

                await sendEmail(user.email, emailSubject, emailText);
                console.log(`Feedback email sent to ${user.email}`);
            }
        } catch (emailError) {
            console.error('Failed to send feedback email:', emailError);
            // Don't fail the request if email fails
        }

        res.status(200).json({
            success: true,
            message: "Feedback and scores submitted successfully",
            data: request
        });

    } catch (error) {
        console.error('Error submitting interview feedback:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// Controller to handle users fetching their completed interviews with scores
const getUserCompletedInterviews = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming authUser middleware adds user to req

        const completedInterviews = await InterviewRequestModel.find({ userId, status: 'completed' })
            .select('position date time mode scores') // Select relevant fields
            .sort({ date: -1, time: -1 }); // Sort by date and time descending

        res.status(200).json({
            success: true,
            data: completedInterviews
        });

    } catch (error) {
        console.error('Error fetching user completed interviews:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export {
    submitInterviewRequest,
    getPendingInterviewRequests,
    acceptInterviewRequest,
    rejectInterviewRequest,
    getAllInterviewRequests,
    getUpcomingInterviewRequestsForHr,
    submitInterviewFeedback,
    getUserCompletedInterviews
}; 