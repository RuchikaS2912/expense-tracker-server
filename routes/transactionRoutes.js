const express = require("express");
const {
  getTransactions,
  createTransaction,
  deleteTransaction,
  getLabels,
} = require("../controller/transactionController");
const transactionRouter = express.Router();

transactionRouter.get("/transactions", getTransactions);
transactionRouter.post("/transactions", createTransaction);
transactionRouter.delete("/transactions", deleteTransaction);
transactionRouter.get("/labels", getLabels);

module.exports = transactionRouter;
