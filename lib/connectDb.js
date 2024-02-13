import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const connectDb = async () => {
  // use trycach to handle the error
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    return client;
  } catch (error) {
    console.log("error", error);
  }
};

export default connectDb;
