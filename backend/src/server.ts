import dotenv from "dotenv";
import ConnectDB from "./config/db";

dotenv.config();

async function startApplication() {
  const { default: redisClient } = await import("./config/redis");
  const { default: app } = await import("./app");

  const PORT = process.env.Port || 5001;

  ConnectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Redis Status: ${redisClient.status}`);
  });
}

startApplication();
