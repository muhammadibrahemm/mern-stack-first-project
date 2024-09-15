const jwt = require("jsonwebtoken");

const generateToken = (_id,username,email,phone) => {
    const token =  jwt.sign
    (
        {
            _id,
            username,
            email,
            phone
        },
        "South Korea",
        {
            expiresIn: "30d"
        }
    );
    return token;
}

module.exports = generateToken;