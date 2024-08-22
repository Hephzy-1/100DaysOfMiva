import mongoose from "mongoose";
import config from "./env";

const connect = async () => {
  try {
    if (!config.DB_URI) {
      throw new Error("DB_URI is undefined. Ensure that your .env file is configured correctly.");
    }

    await mongoose.connect(config.DB_URI);
    console.log('MongoDB connected');
  } catch (err) {
    if (err instanceof Error) { // Type narrowing
      console.error(err.message);
    } else {
      console.error("An unknown error occurred:", err);
    }
    process.exit(1);
  }
};

export default connect;
