const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Create indexes for better performance
    await createIndexes();
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1);
  }
};

const createIndexes = async () => {
  try {
    // User indexes
    await mongoose.connection.db
      .collection("users")
      .createIndex({ email: 1 }, { unique: true });

    // Notice indexes
    await mongoose.connection.db
      .collection("notices")
      .createIndex({ title: "text", description: "text" });

    console.log("Database indexes created successfully");
  } catch (error) {
    console.log("Index creation warning:", error.message);
  }
};

module.exports = connectDB;
