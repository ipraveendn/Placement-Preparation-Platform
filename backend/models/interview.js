import mongoose from 'mongoose';

const interviewSchema = new mongoose.Schema({
    type: { type: String, enum: ['HR', 'AI'], required: true },

    position: { type: String, required: true },

    // For HR Interview
    date: { type: String },
    time: { type: String },

    // For AI Interview
    interviewType: { type: String },
    difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] },
    duration: { type: String },

    score: { type: String, default: '' }
});

const Interview = mongoose.models.Interview || mongoose.model('Interview', interviewSchema);
export default Interview;
