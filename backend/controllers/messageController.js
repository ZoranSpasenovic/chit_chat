const Message = require("../models/messageModel");
const User = require("../models/userModel");
const cloudinary = require("../lib/cloudinary");
const { getReceiverId, io } = require("../lib/socket");

const getUsersForSideBar = async (req, res) => {
  try {
    const myUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: myUserId } });

    res.status(200).json(filteredUsers);
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getMessages = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });
    res.status(201).json(messages);
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });
    await newMessage.save();
    const receiverSocketId = getReceiverId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receiveMessage", newMessage);
    }

    res.status(200).json(newMessage);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getMessages,
  getUsersForSideBar,
  sendMessage,
};
