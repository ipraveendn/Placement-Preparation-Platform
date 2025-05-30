import mongoose from 'mongoose';

const connectDB = async () => {

    try {

        mongoose.connection.on('connected', () => {
            console.log('MongoDB connected');
        });
        await mongoose.connect(`${process.env.MONGODB_URI}/PlacementSeries`)

        console.log('✅ MongoDB connected');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        // process.exit(1); // Stop the server if DB connection fails
    }
}


export default connectDB;