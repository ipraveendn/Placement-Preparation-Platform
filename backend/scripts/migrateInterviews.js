import mongoose from 'mongoose';
import dotenv from 'dotenv';
import InterviewRequestModel from '../models/interviewRequestModel.js';
import MockInterview from '../models/mockInterview.js';

// Load environment variables
dotenv.config();

const migrateInterviews = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Find all accepted interview requests
        const acceptedRequests = await InterviewRequestModel.find({ 
            status: 'accepted' 
        }).populate('userId').populate('hrId');

        console.log(`Found ${acceptedRequests.length} accepted interview requests`);

        // Create corresponding mock interview documents
        let successCount = 0;
        let errorCount = 0;

        for (const request of acceptedRequests) {
            try {
                // Check if a mock interview already exists for this request
                const existingInterview = await MockInterview.findOne({
                    userId: request.userId._id,
                    date: request.date,
                    time: request.time
                });

                if (existingInterview) {
                    console.log(`Mock interview already exists for request ${request._id}`);
                    continue;
                }

                const newInterview = new MockInterview({
                    userId: request.userId._id,
                    hrId: request.hrId._id,
                    position: request.position,
                    date: request.date,
                    time: request.time,
                    mode: request.mode,
                    platform: request.platform,
                    venue: request.venue,
                    status: 'scheduled'
                });

                await newInterview.save();
                successCount++;
                console.log(`Created mock interview for request ${request._id}`);
            } catch (error) {
                errorCount++;
                console.error(`Error creating mock interview for request ${request._id}:`, error.message);
            }
        }

        console.log('\nMigration Summary:');
        console.log(`Total requests processed: ${acceptedRequests.length}`);
        console.log(`Successfully migrated: ${successCount}`);
        console.log(`Failed migrations: ${errorCount}`);

    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        // Close MongoDB connection
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
    }
};

// Run the migration
migrateInterviews(); 