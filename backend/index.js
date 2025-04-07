const express = require("express");
const dotenv = require("dotenv");
const db = require("./lib/db");

const authRoutes = require("./routes/authRoutes");

dotenv.config();
const app = express();
db();
app.use(authRoutes);
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});
