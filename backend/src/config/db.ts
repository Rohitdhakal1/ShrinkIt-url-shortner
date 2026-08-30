import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const ConnectDB = async () => {
  try {
    const mongo_url = process.env.MONGODB_URI;

    if (!mongo_url) {
      throw new Error("MONGO_URI is not defined in the .env file");
    }

    const conn = await mongoose.connect(mongo_url);

    console.log("MongoDB Connected");
  } catch (error) {
    console.error(`MongoDB connection error: ${(error as Error).message}`);
    console.error(
      "Server will keep running and retry the connection in the background.",
    );
  }
};

export default ConnectDB;
