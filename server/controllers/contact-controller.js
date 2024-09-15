const Contact = require("../models/contact-model");
const CustomError = require("../utils/Error-Class");


const contactForm = async (req, res) => {
    try {
        const response = req.body;
        await Contact.create(response);
        return res
        .status(200)
        .json({msg: "message send successfully"});
    } catch (error) {
        return res
        .status(500)
        .json(new CustomError(500,"Internal Server Error during contact Form"));
    }
}

module.exports = contactForm