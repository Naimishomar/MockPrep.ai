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
    type: Object,
    required: false,
  },
  confindence: {
    type: [Number],
    required: false,
  },
  role: {
    type: String,
    required: true,
  },
});

const History = mongoose.model("History", historySchema);
module.exports = History;
