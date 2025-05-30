import jwt from 'jsonwebtoken';
import HR from '../models/hr.js';

export const hrAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No authentication token, access denied'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
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
        res.status(401).json({
            success: false,
            message: 'Token is invalid or expired'
        });
    }
}; 