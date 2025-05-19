import mongoose from 'mongoose';

const connectDB=async()=>{
    mongoose.connection.on('connected',()=>{
        console.log('MongoDB connected');
    })
    mongoose.connect(`${process.env.MONGODB_URI}/PlacementSeries`)
}

export default connectDB;