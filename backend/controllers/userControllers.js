const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const loginUser = async (req, res) => {
  console.log("got request in login");

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json("Invalid Email or Password");
  }
};

const registerUser = async (req, res) => {
  console.log("got request in register");
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json("Complete all fields.");
    return;
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json("User exists");
    return;
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json("Error creating your account");
  }
};

module.exports = { loginUser, registerUser };
