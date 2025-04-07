const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connected:" + connect.connection.host);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
