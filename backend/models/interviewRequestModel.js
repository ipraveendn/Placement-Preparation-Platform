import mongoose from 'mongoose';

const interviewRequestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    date: {
        type: String, // Or Date type if preferred
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    mode: {
        type: String,
        enum: ['online', 'offline'],
        default: 'online',
        required: true,
    },
    platform: {
        type: String, // e.g., 'Google Meet', 'Zoom', 'Venue Address'
        required: function() { return this.mode === 'online'; } // Only required for online mode
    },
    venue: {
        type: String, // Required only if mode is offline
        required: function() { return this.mode === 'offline'; }
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
    },
    hrId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hr',
        default: null,
    },
    adminNotes: {
        type: String,
        default: '',
    },
    // New fields for scores and feedback
    scores: {
        type: Object, // Or a nested schema if more complex validation is needed
        default: null, // Initially null, will be updated by HR
    },
    feedback: {
        type: String,
        default: '',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const InterviewRequestModel = mongoose.model('InterviewRequest', interviewRequestSchema);

export default InterviewRequestModel; 