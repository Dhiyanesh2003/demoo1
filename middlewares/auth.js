
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
    const token = req.headers['auth-token']
    if (!token) return res.status(200).json({ message: 'Unauthorized', isAuthorized: false });
    
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(200).json({ message: 'Unauthorized', isAuthorized: false });
        req.user = decoded.user;
        next();
    });
};

module.exports = verifyToken;