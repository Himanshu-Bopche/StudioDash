import mongoose from "mongoose";

let dbReady = false;
let connectionPromise = null;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    dbReady = true;
    return true;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  if (!process.env.MONGO_URI) {
    console.warn("⚠️ MONGO_URI not found. Continuing without MongoDB.");
    return false;
  }

  connectionPromise = mongoose
    .connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    })
    .then((conn) => {
      dbReady = true;
      console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
      return true;
    })
    .catch((error) => {
      dbReady = false;
      console.error("⚠️ MongoDB Connection Error:", error.message);
      return false;
    })
    .finally(() => {
      connectionPromise = null;
    });

  return connectionPromise;
};

export const isDbReady = () => dbReady;
export default connectDB;