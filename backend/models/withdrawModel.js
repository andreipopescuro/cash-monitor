const mongoose = require("mongoose");

const withdrawModel = mongoose.Schema(
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

const Withdraw = mongoose.model("Withdraw", withdrawModel);
module.exports = Withdraw;
