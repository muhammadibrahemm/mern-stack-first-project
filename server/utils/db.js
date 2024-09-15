const mongoose = require('mongoose');


const URI = process.env.MONGO_DB_URL
const connectDB = async()=>{
    try {
        await mongoose.connect(URI);
        console.log("Connection gets successful");
    } catch (error) {
        console.error("Connection failed");
        process.exit(0)
    }
}

module.exports = connectDB