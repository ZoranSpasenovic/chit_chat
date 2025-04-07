const express = require("express");
const dotenv = require("dotenv");
const db = require("./lib/db");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
db();
app.use("/api/auth", authRoutes);
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});
