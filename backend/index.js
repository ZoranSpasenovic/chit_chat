const express = require("express");
const dotenv = require("dotenv");
const db = require("./lib/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { io, app, server } = require("./lib/socket");

const path = require("path");

const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");

dotenv.config();
if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: "http://localhost:5173", credentials: true }));
}

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

db();
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 5001;

if (process.env.NODE_ENV === "production") {
  const staticPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(staticPath));

  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});
