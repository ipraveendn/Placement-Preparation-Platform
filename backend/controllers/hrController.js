import HR from '../models/hr.js';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken';

const generateRandomPassword = () => {
    return Math.random().toString(36).slice(-8); // random 8 char string
  };




export const createHr = async (req, res) => {
    const { name, email, department } = req.body;

    try {
        const existing = await HR.findOne({ email });
        if (existing) return res.status(400).json({ message: 'HR already exists' });


        // Generate a random temporary password
        const tempPassword = generateRandomPassword();
        console.log(tempPassword);
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(tempPassword, 12);

        const newHr = new HR({ name, email, department, password: hashedPassword });
        await newHr.save();



        // Send email (optional)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Welcome to the Company HR Portal',
            text: `Hello ${name},\n\nYou have been registered as an HR for the ${department} department.\n\nYour temporary password is: ${tempPassword}\n\nPlease log in and change your password immediately.\n\nThank you.`,
        };

        try {
            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Mail sending failed:', error);
            return res.status(201).json({
                message: 'HR added, but email notification failed.',
                warning: 'Email sending failed, please notify manually.',
                hr: newHr
            });
        }
        

        res.status(201).json({ message: 'HR added successfully and notified via email.', hr: newHr });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Same loginHr function as before
export const loginHr = async (req, res) => {
    const { email, password } = req.body;

    try {
        const hr = await HR.findOne({ email });
        if (!hr) return res.status(404).json({ message: 'HR not found' });

        const isPasswordCorrect = await bcrypt.compare(password, hr.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign(
            { id: hr._id, email: hr.email, role: hr.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({ result: hr, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
  



export const getHRCount = async (req, res) => {
    try {
        const count = await HR.countDocuments();
        res.status(200).json({
            success: true,
            count
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};





// Add this route to your admin routes

export const getAllHRs = async (req, res) => {
    try {
        const hrs = await HR.find({}, 'name email department');
        res.status(200).json({
            success: true,
            hrs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch HR list',
            error: error.message
        });
    }
};

