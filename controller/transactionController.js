const Transaction = require("../models/transactionModel");

const getTransactions = async (req, res) => {
  let data = await Transaction.find({});
  return res.json(data);
};

const createTransaction = async (req, res) => {
  console.log(req.body, "Transaction creation request body");
  if (!req.body) {
    return res.status(400).json({ message: "Post HTTP data not provided" });
  }
  let { name, amount, type } = req.body;
  const newTransaction = new Transaction({
    name,
    type,
    amount,
    date: new Date(),
  });
  await newTransaction
    .save()
    .then(() => {
      return res
        .status(200)
        .json({ message: "Successfully created transaction" });
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
};

const deleteTransaction = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "Delete HTTP data not provided" });
  }
  await Transaction.deleteOne(req.body.name)
    .then(() => {
      return res
        .status(200)
        .json({ message: " Successfully deleted transaction" });
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
};

const getLabels = async (req, res) => {
  Transaction.aggregate([
    {
      $lookup: {
        from: "Category",
        localField: "type",
        foreignField: "type",
        as: "categories_info",
      },
    },
    {
      $unwind: "$categories_info",
    },
  ])
    .then((result) => {
      let data = result.map((item) =>
        Object.assign(
          {},
          {
            _id: item._id,
            name: item.name,
            amount: item.amount,
            type: item.type,
            color: item.categories_info["color"],
          }
        )
      );
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("LookUp collection error");
    });
};

module.exports = {
  getTransactions,
  createTransaction,
  deleteTransaction,
  getLabels,
};
