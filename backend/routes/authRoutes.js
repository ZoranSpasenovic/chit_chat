const express = require("express");
const { login, logout, signup } = require("../controllers/userController");

const router = express.Router();

router.post("/api/auth/signup", signup);

router.post("/api/auth/login", login);

router.post("/api/auth/logout", logout);

module.exports = router;
