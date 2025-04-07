const jwt = require("jsonwebtoken");
import User from "../models/userModel";

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res.status(400).json({ message: "User not authorized!" });
    const decoded = jwt.verify(token, JWT_KEY);
    if (!decoded)
      return res.status(400).json({ message: "User is not authorized!" });
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(400).json({ message: "User not found!" });

    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports = protect;
