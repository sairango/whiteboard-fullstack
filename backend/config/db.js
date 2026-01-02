import mongoose from "mongoose";

const connectionString = process.env.DATABASE_URI;



const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log("Db connected");
  } catch (err) {
    console.log("Error while connecting to DB", err.message);
    console.log(connectionString);
  }
};

export default connectToDb;
