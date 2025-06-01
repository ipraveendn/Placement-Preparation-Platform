import jwt from 'jsonwebtoken';
import HR from '../models/hr.js';

export const hrAuth = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: 'No authentication token, access denied'
            });
        }

        const token = authHeader.startsWith('Bearer ')
            ? authHeader.slice(7)
            : authHeader;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token format'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded.id) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token payload'
            });
        }

        const hr = await HR.findById(decoded.id);
        if (!hr) {
            return res.status(401).json({
                success: false,
                message: 'HR not found'
            });
        }

        req.user = {
            id: hr._id,
            email: hr.email,
            role: 'hr'
        };

        next();
    } catch (error) {
        console.error('HR Auth Error:', error);
        res.status(401).json({
            success: false,
            message: 'Token is invalid or expired'
        });
    }
}; 