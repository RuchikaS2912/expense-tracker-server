const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database successfully");
  } catch (error) {
    console.log(error.message);
    console.log("Connecting to the database failed");
    process.exit(1);
  }
};

module.exports = { connectDB };
