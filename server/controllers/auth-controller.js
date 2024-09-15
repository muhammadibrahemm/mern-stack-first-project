const User = require("../models/user-model");
const bcryptjs = require('bcryptjs');
const jsonToken = require("../utils/tokens")
const CustomError = require("../utils/Error-Class")

/**
 * Registration Controller
 */

const register = async(req,res) => {
    try {
        /**
         * destructring the json object
         */
        const {username,email,phone,password} = req.body;
        console.log("req.body",req.body);
        
        const isUserExists = await User.findOne({email});
        if(isUserExists){
            return res
            .status(400)
            .json(new CustomError(400,"user is already exists"));
        }

        
        const userCreated = await User.create({
            username,email,phone,password
        })
        
        console.log("createdUser",userCreated);
        
        if(userCreated)
        {
            return res
            .status(201)
            .json({
                msg:"User registered successfully",
                token: await userCreated.generateToken(),
                userId: userCreated._id.toString()
            });
        }

    } catch (error) {
        console.log("error in auth controller",error);
        
        return res
        .status(400)
        .send({msg:"Page Not Found"})
    }
}

const loggedIn = async(req,res) => {
    const {email, password} = req.body;

    // check whether user email exists or not
    const userExists = await User.findOne({email});
    console.log("User Exists",userExists);

    // if(!userExists){
    //     return res
    //     .status(401)
    //     .json({msg:"Invalid Credentials"});
    // }

    if(!userExists){
        return res
        .status(401)
        .json(new CustomError(401,"Invalid Credentials"));
    }

    // now user exists so check his password
    const verifyUserPassword = await userExists.verifyPassword(password);
    if(!verifyUserPassword){
        return res
        .status(401)
        .json(new CustomError(401,"incorrect email or password"));
    }

    return res
    .status(200)
    .json({
        msg:"user has been successfully logged in",
        accessToken: await userExists.generateToken(),
        userId: userExists._id.toString()
    });
}

/**
 * User Logic
 * to send user data
 */

const user = async (req,res) => {
    try {
        const userData = req.user;
        res.status(200).json({ msg:userData });

    } catch (error) {
        console.log(`error from the user route: ${error}`);
        
    }
}

module.exports = {
    register,loggedIn,user
}