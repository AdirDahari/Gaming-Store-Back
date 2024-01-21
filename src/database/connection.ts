import mongoose from "mongoose";
import { initDB } from "./initDB";

const connect = async () => {
  try {
    const connectionString = process.env.DB_CONNECTION_STRING;

    if (!connectionString) {
      console.log("DB_CONNECTION_STRING IS NOT DEFINED IN your .env file");
      return;
    }

    await mongoose.connect(connectionString);

    console.log("Database Connected");

    await initDB();
  } catch (err) {
    console.log("Error Connecting to database", err);
  }
};

export { connect };
