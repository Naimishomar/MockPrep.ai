const mongoose = require('mongoose');

exports.connectDb = async()=>{
    try {
       const connect = await mongoose.connect(process.env.MONGODB_URL) 
       console.log("Database connected successfully");   
    } catch (error) {
        console.log(error);
    }
}