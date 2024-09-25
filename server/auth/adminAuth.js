const jwt = require('jsonwebtoken');

const adminAuth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Assuming Bearer token format

    if (!token) {
        return res.status(403).json({ message: "No token provided, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.adminId = decoded.id; // Set the adminId to the request object
        next(); // Proceed to the next middleware/route handler
    } catch (error) {
        return res.status(401).json({ message: "Token is not valid" });
    }
};

module.exports = adminAuth;
