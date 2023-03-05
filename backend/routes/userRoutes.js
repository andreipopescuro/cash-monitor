const {
  loginUser,
  registerUser,
} = require("../controllers/userControllers.js");

const router = require("express").Router();

router.post("/login", loginUser);
router.post("/register", registerUser);

module.exports = router;
