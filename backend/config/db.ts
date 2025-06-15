import mongoose from "mongoose";

const connectDB = async () => {
  mongoose
    .connect(
      process.env.MONGO_URI! || "mongodb://127.0.0.1:27017/jsonvalidator"
    )
    .then(() => {
      console.log("MongoDB connected successfully");
      console.log("mongodb host:", mongoose.connection.host);
      console.log("mongodb port:", mongoose.connection.port);
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
      process.exit(1); // Exit the process with failure
    });
};

export default connectDB;
