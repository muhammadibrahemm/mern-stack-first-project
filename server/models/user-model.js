const mongoose = require('mongoose');
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

/**
 * define the model or the collection name
 */

userSchema.pre("save",async function(next){
        // Only hash if the password is new or modified
        if(this.isModified('password')){
            try {
                const salt = await bcryptjs.genSalt(10);
                // Set hashed password on the user object
                const hash = await bcryptjs.hash(this.password, salt);
                this.password = hash;
            } catch (error) {
                // Handle any error with hashing
                next(error);
            }
        }
        // Move to the next middleware if everything is fine
        next();
})

/**
 * generating the access tokens
 */
userSchema.methods.generateToken = async function(){
    try {
        return  jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email,
                isAdmin: this.isAdmin
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn:"30d"
            }
        );
    } catch (error) {
        console.log("error in generating the access tokens:",error);
    }
}

/**
 * Verifying User Password
 * step no.1 password will come as input
 * step no.2 this.password 
 * step no.3 compare both using bcript if it's matched so it returns true and 
 * shows the message that user has been successfully logged in
 */

userSchema.methods.verifyPassword = function(password){
    return bcryptjs.compare(password,this.password);
}


// Define the User model
const User = new mongoose.model("User",userSchema);

/**
 * exporting the user model 
 */

module.exports = User;
