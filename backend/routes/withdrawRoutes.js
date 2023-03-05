const {
  getWithdraw,
  addWithdraw,
  deleteWithdraw,
} = require("../controllers/withdrawControllers.js");
const { protect } = require("../middleware/authMiddleware.js");

const router = require("express").Router();

router.get("/", protect, getWithdraw);
router.post("/", protect, addWithdraw);
router.delete("/", protect, deleteWithdraw);

module.exports = router;
