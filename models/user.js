const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Insert user schema for Mongoose here
const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
    unique: true
  },
  wallet: {
    type: Object
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
