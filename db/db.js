const mongoose = require("mongoose");
const dotenv=require("dotenv")
dotenv.config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("database Connected");
    } catch (error) {
        console.error("Error while connecting to databse", error);
        throw new Error
    }
};

module.exports = connectDB;
