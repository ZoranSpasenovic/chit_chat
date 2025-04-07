const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generateToken, deleteToken } = require("../utils/token");
const cloudinary = require("../lib/cloudinary");

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

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Password is not correct!" });

    generateToken(user._id, res);
  } catch (err) {
    return res.status(400).json({ message: "Internal server Error!" });
  }
  return res.status(201).json({ message: "Login Succesful!" });
};

const logout = (req, res) => {
  deleteToken(res);
};

const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic)
      return res.status(400).json({ message: "Profile Pic is not provided" });

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        profilePic: uploadResponse.secure_url,
      },
      { new: true }
    );
    return res.status(200).json({ message: "Profile picture is updated" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    return res.status(400).json({ message: "User not autorized" });
  }
};

module.exports = {
  signup,
  login,
  logout,
  updateProfile,
  checkAuth,
};
