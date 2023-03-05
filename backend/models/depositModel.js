const mongoose = require("mongoose");

const depositModel = mongoose.Schema(
  {
    amount: {
      type: Number,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Deposit = mongoose.model("Deposit", depositModel);
module.exports = Deposit;
