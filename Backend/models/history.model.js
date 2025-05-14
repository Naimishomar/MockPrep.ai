const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  dateTime: {
    type: Date,
    default: Date.now, // Automatically sets to current date and time
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  conversation: {
    type: String,
    required: false,
  },
  confindence: {
    type: [Number],
    required: false,
  },
});

const History = mongoose.model("History", historySchema);
module.exports = History;
