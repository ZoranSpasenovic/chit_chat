const express = require("express");
const {
  login,
  logout,
  signup,
  updateProfile,
} = require("../controllers/userController");
const protect = require("../middleware/protect");

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.put("/update-profile", protect, updateProfile);

module.exports = router;
