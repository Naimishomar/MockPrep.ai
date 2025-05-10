const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const History = mongoose.model('History', historySchema);
module.exports = History;