const {
  addDeposit,
  getDeposits,
  deleteDeposit,
} = require("../controllers/depositControllers.js");
const { protect } = require("../middleware/authMiddleware.js");

const router = require("express").Router();

router.get("/", protect, getDeposits);
router.post("/", protect, addDeposit);
router.delete("/", protect, deleteDeposit);

module.exports = router;
