import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const connectDb = async () => {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  return client;
};

export default connectDb;
