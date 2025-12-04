require('dotenv').config();
const mongoose = require('mongoose');

const mongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to database");
    } catch (error) {
        console.log("MongoDB connection error:", error.message);
    }
};

module.exports = mongoDB;
