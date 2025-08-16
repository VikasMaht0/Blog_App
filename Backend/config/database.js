const mongoose = require('mongoose');

const connectDB = async() =>{
    try {
         await mongoose.connect('mongodb://localhost:27017/bloggytech');
    console.log("connected successfully to MongoDB")
    } catch (error) {
        console.log("connection to mongodb failed:", error.message);
    }
   
}

module.exports = connectDB;