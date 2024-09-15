const jwt = require('jsonwebtoken');
const userModel = require("../models/user-model");


const authMiddlware = async(req,res,next) => {
    const token = req.header("Authorization");

    if(!token){
        // if you attempt to use an expired token, you will recieve a 401 Unauthorized HTTP response
        return res
        .status(401)
        .json({ message: "Unauthorized HTTP, Token not provided"});
    }
    
    // Assuming token is in format "Bearer <jwtToken>", Removing the "Bearer" prefix
    const jwtToken = token.replace("Bearer","").trim();

    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

        const userData = await userModel.findOne({ email: isVerified.email }).select({
            password:0,
        });

        console.log(userData);
        req.user = userData;
        req.token = token;
        req.userId = userData._id;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized. Invalid token."})
    }
}


module.exports = authMiddlware;
