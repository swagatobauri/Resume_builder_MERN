require('dotenv').config(); // load .env variables
const mongoose = require('mongoose');

const mongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to database");
    } catch (error) {
        console.log("MongoDB connection error:", error.message);
    }
};

module.exports = mongoDB;
