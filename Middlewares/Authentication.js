const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        // console.log("token : ", token);
        if (!token) {
            return res.status(401).json({ message: "User not authenticated." })
        };
        const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        // console.log("Decode : ", decode);
        if (!decode) {
            return res.status(401).json({ message: "Invalid token" });
        };
        req.id = decode.userId;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error while authentication.", error });
    }
}

module.exports = isAuthenticated