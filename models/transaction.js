const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// NOTE: Could I just make it so the coin and purchase price are all that's required?
// If I record just the cash value I can use that to determine the amount of coins the user has
// depending on the current value of the coin.
// Actually, if we want the user to be able to view their transaction then listing the amount of coin
// purchased per transaction is still valuable information.  Probs get rid of coinID though.

// Insert user schema for Mongoose here
const transactionSchema = new Schema({
  transactionType: {
    type: String,
    required: true
  },
  coinSymbol: {
    type: String,
    required: true
  },
  coinID: {
    type: Number,
    required: true
  },
  transactionAmount: {
    type: Number,
    required: true
  },
  coinAmount: {
    type: Number,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
