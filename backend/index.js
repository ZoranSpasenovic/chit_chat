const express = require("express");
const dotenv = require("dotenv");
const db = require("./lib/db");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
db();
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});
