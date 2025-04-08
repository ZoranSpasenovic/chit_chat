const express = require("express");
const {
  getMessages,
  getUsersForSideBar,
  sendMessage,
} = require("../controllers/messageController");
const protect = require("../middleware/protect");

const router = express.Router();

router.get("/users", protect, getUsersForSideBar);

router.get("/:id", protect, getMessages);

router.post("/send/:id", protect, sendMessage);

module.exports = router;
