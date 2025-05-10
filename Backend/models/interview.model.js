const mongoose = require('mongoose');

const interViewSchema = new mongoose.Schema({
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    skill:{
        type: String,
        enum: ['Frontend Developer','Backend Developer','Fullstack Web Developer','UI/UX Developer','Android Developer','Cyber Security','AR/VR Developer','Other'],
        required: true,
    },
    experience:{
        type: String,
        enum: ['Fresher','1 year','2 year','5+ year']
    },
    resume:{
        type: String,
        required: true
    },
    duration:{
        type: String,
        enum: ['5 min','10 min','15 min','30 min']
    }
})

const Interview = mongoose.model('Interview', interViewSchema);
module.exports = Interview;