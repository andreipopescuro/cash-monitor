const Withdraw = require("../models/withdrawModel.js");
const getWithdraw = async (req, res) => {
  try {
    const withDrawWithTotal = await Withdraw.aggregate([
      {
        $match: { user: req.user._id },
      },
      {
        $group: {
          _id: null,
          totalWithdraw: { $sum: "$amount" },
          withdraws: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          _id: 0,
          totalWithdraw: 1,
          withdraws: 1,
        },
      },
    ]);
    res.status(200).json({
      totalWithdraw: withDrawWithTotal.length
        ? withDrawWithTotal[0].totalWithdraw
        : 0,
      withdraws: withDrawWithTotal.length ? withDrawWithTotal[0].withdraws : [],
    });
  } catch (error) {
    console.log(error);
    res.status(401).json("Something went wrong");
  }
};

const addWithdraw = async (req, res) => {
  if (isNaN(req.body.amount)) {
    return res.status(401).json("The input must be a number");
  }
  try {
    const newWithdraw = await Withdraw.create({
      amount: req.body.amount,
      user: req.user._id,
    });
    res.status(200).json(newWithdraw);
  } catch (error) {
    // console.log(error);
    res.status(401).json("Something went wrong");
  }
};

const deleteWithdraw = async (req, res) => {
  try {
    const deletedWithdraw = await Withdraw.findByIdAndDelete(req.body.wdId);
    res.status(200).json(deletedWithdraw);
  } catch (error) {
    console.log(error);
    res.status(401).json("Something went wrong");
  }
};

module.exports = { getWithdraw, addWithdraw, deleteWithdraw };
