const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const header = req.header("Authorization")

    if(!header) {
        return res.json({
            message:"no token provided"
        })
    }
    const token= header.split(" ")[1];

    if (!token) {
        return res.status(401).json({
             message: "not authorized" 
            });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

module.exports = authMiddleware;
