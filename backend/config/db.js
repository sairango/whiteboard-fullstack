import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectionString = process.env.DATABASE_URI;

const connectToDb = async () => {
  if (!connectionString) {
    throw new Error("DATABASE_URI is not defined in environment variables");
  }

  try {
    await mongoose.connect(connectionString);
    console.log("Db connected");
  } catch (err) {
    console.log("Error while connecting to DB", err.message);
  }
};

export default connectToDb;
