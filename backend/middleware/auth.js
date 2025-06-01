import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    console.log('Incoming Headers:', req.headers); // Add this line
    const authHeader = req.headers.authorization; // Get the Authorization header

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.json({ sucess: false, message: "Not Authorized Login Again" })
    }

    const token = authHeader.split(' ')[1]; // Extract the token after "Bearer "

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: token_decode.id }; // Attach user ID to req.user
        next()
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}
export default authUser;