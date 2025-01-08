import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({});

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {})
    .then(() => {
      console.log("DB connection established");
    })
    .catch((err) => {
      console.error(err);
      console.log("Error while connection to DB");
      process.exit(1);
    });
};

export default connectDB;
