import mongoose from 'mongoose';

const hrSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    department: { type: String },
    role: { type: String, default: 'HR' },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});



const hr = mongoose.models.hr || mongoose.model('hr',hrSchema);

export default hr;


