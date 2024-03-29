import mongoose from "mongoose";
import { initDB } from "./initDB";
import { Logger } from "../logs/logger";

const connect = async () => {
  try {
    const connectionString = process.env.DB_CONNECTION_STRING;

    if (!connectionString) {
      Logger.error("DB_CONNECTION_STRING IS NOT DEFINED IN your .env file");
      return;
    }

    await mongoose.connect(connectionString);

    Logger.connect("Database Connected");

    await initDB();
  } catch (err) {
    Logger.error("Error Connecting to database", err);
  }
};

export { connect };
