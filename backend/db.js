import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    console.log("⚠️  Please update MONGO_URI in .env file with your MongoDB Atlas credentials");
    // Don't exit the process, allow server to run without MongoDB
    // process.exit(1);
  }
};
