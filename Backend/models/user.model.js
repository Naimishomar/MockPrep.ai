const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true 
    },
    contactNumber:{
        type: Number,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    profilePicture:{
        type: String,
        default: ''
    },
    college:{
        type: String,
    },
    age:{
        type: Number,
    },
    history:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'History'
        }
    ],
    subscription: {
        type: String,
        enum: ['Subscribed', 'Unsubscribed'],
        default: 'Subscribed',
    },
},{timestamps: true})

const User = mongoose.model('User', userSchema);
module.exports = User;