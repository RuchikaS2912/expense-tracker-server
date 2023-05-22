const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
  name: {
    type: String,
    default: "Anonymous",
  },
  type: {
    type: String,
    default: "Investment",
  },
  amount: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
