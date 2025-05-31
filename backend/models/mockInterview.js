import mongoose from 'mongoose';

const mockInterviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    hrId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hr',
        required: true
    },
    position: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'scheduled', 'completed', 'cancelled'],
        default: 'pending'
    },
    mode: {
        type: String,
        enum: ['online', 'offline'],
        required: true
    },
    platform: {
        type: String,
        required: function() {
            return this.mode === 'online';
        }
    },
    venue: {
        type: String,
        required: function() {
            return this.mode === 'offline';
        }
    },
    scores: {
        technical: {
            type: Number,
            min: 0,
            max: 100
        },
        communication: {
            type: Number,
            min: 0,
            max: 100
        },
        problemSolving: {
            type: Number,
            min: 0,
            max: 100
        },
        overall: {
            type: Number,
            min: 0,
            max: 100
        }
    },
    feedback: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const MockInterview = mongoose.models.MockInterview || mongoose.model('MockInterview', mockInterviewSchema);
export default MockInterview; 