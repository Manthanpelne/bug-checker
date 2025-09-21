const mongoose = require("mongoose")

const user = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30
  },
  
  email: {
    type: String,
    required: true,
    unique: true
  },
  
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  
  role: {
    type: String,
    required: true,
    default: "reporter",
    enum: ["admin", "reporter"]
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("User", user);


