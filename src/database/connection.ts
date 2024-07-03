import { connect as mongooseConnect, connection } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGO_URL = process.env.MONGO_URL;
export const connect = async (): Promise<void> => {
  try {
    await mongooseConnect(MONGO_URL as string);
    console.log("Database connected.");
  } catch (error) {
    console.log(error);
  }
};

export const close = (): Promise<void> => connection.close();
