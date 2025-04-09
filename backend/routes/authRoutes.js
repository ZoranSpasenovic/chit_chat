const express = require("express");
const {
  login,
  logout,
  signup,
  updateProfile,
  checkAuth,
} = require("../controllers/userController");
const protect = require("../middleware/protect");

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.put("/update-profile", protect, updateProfile);

router.get("/check", protect, checkAuth);

module.exports = router;
