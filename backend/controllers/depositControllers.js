const Deposit = require("../models/depositModel.js");
const getDeposits = async (req, res) => {
  try {
    const depositsWithTotal = await Deposit.aggregate([
      {
        $match: { user: req.user._id },
      },
      {
        $group: {
          _id: null,
          totalDeposit: { $sum: "$amount" },
          deposits: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          _id: 0,
          totalDeposit: 1,
          deposits: 1,
        },
      },
    ]);
    res.status(200).json({
      totalDeposit: depositsWithTotal.length
        ? depositsWithTotal[0].totalDeposit
        : 0,
      deposits: depositsWithTotal.length ? depositsWithTotal[0].deposits : [],
    });
  } catch (error) {
    console.log(error);
    res.status(401).json("Something went wrong");
  }
};

const addDeposit = async (req, res) => {
  if (isNaN(req.body.amount)) {
    return res.status(401).json("The input must be a number");
  }
  try {
    const newDeposit = await Deposit.create({
      amount: req.body.amount,
      user: req.user._id,
    });
    res.status(200).json(newDeposit);
  } catch (error) {
    console.log(error);
    res.status(401).json("Something went wrong");
  }
};

const deleteDeposit = async (req, res) => {
  try {
    const deletedDeposit = await Deposit.findByIdAndDelete(req.body.depId);
    res.status(200).json(deletedDeposit);
  } catch (error) {
    console.log(error);
    res.status(401).json("Something went wrong");
  }
};

module.exports = { getDeposits, addDeposit, deleteDeposit };
