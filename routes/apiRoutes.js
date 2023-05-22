const express = require("express");
const router = express();
const transactionRoutes = require("./transactionRoutes");

router.use("/", transactionRoutes);

module.exports = router;
