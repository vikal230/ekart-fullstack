import mongoose from "mongoose";

const connectDb = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGODB_URL);
    // console.log("Check URL:", process.env.MONGODB_URL);
    console.log("db connected");
  } catch (error) {
    console.log("db error hai");
  }
};
export default connectDb;
