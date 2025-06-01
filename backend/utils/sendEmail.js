import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const sendEmail = async (to, subject, text, html) => {
    try {
        // Create a transporter using SMTP
        // You need to configure this with your email service details
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST, // e.g., smtp.gmail.com
            port: process.env.SMTP_PORT, // e.g., 587
            secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER, // Your email address
                pass: process.env.SMTP_PASS, // Your email password or app-specific password
            },
        });

        // Email options
        const mailOptions = {
            from: process.env.SMTP_FROM || process.env.SMTP_USER, // Sender address
            to: to, // Recipient email address
            subject: subject, // Subject line
            text: text, // Plain text body
            html: html, // HTML body
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: %s', info.messageId);
        return { success: true, message: 'Email sent successfully' };

    } catch (error) {
        console.error('Error sending email:', error);
        // In a production environment, you might want to log the error
        // but avoid exposing sensitive details in the response.
        throw new Error('Failed to send email.');
    }
};

export default sendEmail; 