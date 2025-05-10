const mongoose = require('mongoose');

exports.connectDb = async()=>{
    try {
       const connect = await mongoose.connect('mongodb://localhost:27017/MockPrep') 
       console.log("Database connected successfully");   
    } catch (error) {
        console.log(error);
    }
}