const jwt = require("jsonwebtoken");

const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_KEY, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  return token;
};

module.exports = generateToken;
