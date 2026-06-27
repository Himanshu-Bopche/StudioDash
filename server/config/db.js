import mongoose from "mongoose";

let dbReady = false;

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.warn("⚠️ MONGO_URI not found. Continuing without MongoDB.");
    return false;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    dbReady = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    dbReady = false;
    console.error("⚠️ MongoDB Connection Error:", error.message);
    return false;
  }
};

export const isDbReady = () => dbReady;
export default connectDB;