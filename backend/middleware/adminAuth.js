import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
    try {
        // Get token from Authorization header (preferred)
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'Not authorized. No token.' });
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // decoded is an object { email: 'admin@example.com', iat: ..., exp: ... }
        if (decoded.email !== process.env.ADMIN_EMAIL) {
            return res.status(401).json({ success: false, message: 'Not authorized. Invalid token.' });
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false, message: 'Not authorized. Token failed.' });
    }
};

export default adminAuth;
