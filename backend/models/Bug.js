const mongoose = require("mongoose");

const bug = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  
  description: {
    type: String,
    required: true,
  },
  
  severity: {
    type: String,
    required: true,
    default: "Low",
    enum: ["Low", "Medium", "High"]
  },
  
  status: {
    type: String,
    required: true,
    default: "Open",
    enum: ["Open", "In Progress", "Closed"]
  },
  
  reporterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Bug", bug);
