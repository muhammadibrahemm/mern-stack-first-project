const userModel = require("../models/user-model");
const contactModel = require("../models/contact-model");
/**
 * get all users Logic
 */

const getAllUsers = async (req,res) => {
    try {
        const users = await userModel.find({},{password:0});
        if(!users || users.length === 0)
        {
            return res
            .status(404)
            .json(
                {
                    message: "No Users Found"
                }
            );
        }

        return res
        .status(200)
        .json(users);
    } catch (error) {
        console.log('error in getting all users admin dashboard:',error);
        next(error);
    }
}

/**
 * get all contacts logic
 */

const getAllContacts = async (req,res) => {
    try {
        const contacts = await contactModel.find();
        console.log(contacts)
        if(!contacts || contacts.length === 0)
        {
            return res.status(404).json({ message: "No Contacts Found"});
        }
        return res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
}

/**
 * delete a contact based on id
 */

const deleteContact = async(req,res,next) => {
    const _id = req.params.id;
    
    try {
        const contactDeleted = await contactModel.deleteOne({_id})
        if(contactDeleted.deletedCount == 1)
        {
            return res.status(201).json("contact has been successfully deleted");
        }else{
            return res.status(404).json("contact is not deleted successfully");
        }
        
    } catch (error) {
        next(error);
    }
    
    
}

/**
 * getting single user by id
 */

const getUserById = async (req,res) => {
    try {
        console.log("req.params",req.params);
        
        const id = req.params.id;
        const data = await userModel.findOne({ _id:id }, { password:0 });
        return res.status(200).json({data});
    } catch (error) {
       console.log(error);
       next(error) 
    }
}

// update user by id
const updateUserById = async (req,res) => {
    try {
        const id = req.params.id
        console.log(id);
        const updateUserData = req.body;
        

        console.log("Request body:", updateUserData);
        // Ensure the user exists
        const userExists = await userModel.findOne({ _id: id });
        if (!userExists) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user data
        const updatedUserData = await userModel.updateOne({ _id: id }, {
            $set: updateUserData
        });

        console.log("Update result:", updatedUserData);

        // Check if any modification occurred
        console.log(updatedUserData.modifiedCount);
        
        if(updatedUserData.modifiedCount == 0)
        {
            return res.status(400).json({ message: 'No data modified' });
        }

        return res.status(200).json(updatedUserData);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
}

// Deleting a single user
const deleteUser = async (req,res) => {
    try {
        const id = req.params.id;
        console.log(id);
        
        const user = await userModel.deleteOne({_id: id});
        return res
        .status(200)
        .json({
            message:"User Deleted Successfully"
        });

    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllUsers,
    getAllContacts,
    deleteUser,
    getUserById,
    updateUserById,
    deleteContact
};