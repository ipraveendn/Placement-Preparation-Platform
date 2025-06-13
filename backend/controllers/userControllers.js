import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import e from "express";
import jwt from 'jsonwebtoken';
import validator from 'validator';

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}

// Route for user login

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            // Daily streak logic
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Normalize to start of day

            let dailyStreak = user.info.dailyStreak || 0;
            let lastLoginDate = user.info.lastLoginDate ? new Date(user.info.lastLoginDate) : null;
            if (lastLoginDate) {
                lastLoginDate.setHours(0, 0, 0, 0); // Normalize to start of day
            }
            
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);

            if (lastLoginDate && lastLoginDate.getTime() === yesterday.getTime()) {
                // Continue streak if logged in yesterday
                dailyStreak++;
            } else if (lastLoginDate && lastLoginDate.getTime() === today.getTime()) {
                // Already logged in today, do nothing to streak
            } else {
                // Break streak if not logged in yesterday or today
                dailyStreak = 1;
            }
            user.info.dailyStreak = dailyStreak;
            user.info.lastLoginDate = today;
            await user.save(); // Save updated streak and last login date

            const token = createToken(user._id);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Route for user registration

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Input validation
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // checking user already exists
        const exist = await userModel.findOne({ email });
        if (exist) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long"
            });
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            info: { // Initialize info object with default streak and last login date for new users
                dailyStreak: 0,
                lastLoginDate: null
            }
        });

        const user = await newUser.save();
        const token = createToken(user._id);

        res.status(201).json({
            success: true,
            message: "Registration successful",
            token
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: error.message || "Registration failed"
        });
    }
}

// Get user profile
const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming authUser middleware adds user to req
        const user = await userModel.findById(userId).select('-password'); // Exclude password

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, data: user });

    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ success: false, message: "Failed to fetch user profile" });
    }
};

// Update user profile
const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, position, college, location, about } = req.body;

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Update basic info
        if (name) user.name = name;

        // Initialize info object if it doesn't exist
        if (!user.info) {
            user.info = {};
        }

        // Update all profile fields
        if (position !== undefined) user.info.position = position;
        if (college !== undefined) user.info.college = college;
        if (location !== undefined) user.info.location = location;
        if (about !== undefined) user.info.about = about;

        // Save the updated user
        await user.save();

        // Return the updated user data
        const updatedUser = await userModel.findById(userId).select('-password');
        res.json({ 
            success: true, 
            message: "Profile updated successfully", 
            data: updatedUser 
        });

    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to update user profile",
            error: error.message 
        });
    }
};

// Admin Login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("Login attempt:", email, password);
        console.log("Expected:", process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(
                { email }, // payload as object
                process.env.JWT_SECRET,
                { expiresIn: '1d' } // recommended expiration
            );

            res.json({ success: true, token });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


export { loginUser, registerUser, adminLogin, getUserProfile, updateUserProfile };