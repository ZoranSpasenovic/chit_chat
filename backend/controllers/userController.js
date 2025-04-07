const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/token");

const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password)
      return res.status(400).json({ message: "All fields are required" });
    if (fullName.trim().length < 1)
      return res.status(400).json({ message: "Name is not valid" });
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must have at least 6 cahracters" });
    }
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exist!" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      generateToken(newUser.id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({ message: "Invalid User Data!" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = (req, res) => {};

const logout = (req, res) => {};

module.exports = {
  signup,
  login,
  logout,
};
