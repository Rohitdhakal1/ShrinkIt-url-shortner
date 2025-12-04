import dotenv from "dotenv";
import ConnectDB from "./config/db";

// 1. Load environment variables FIRST.
dotenv.config(); 

// 2. Wrap startup logic in an async function
async function startApplication() {
    
    // Dynamically import application files that rely on process.env 
    // This code ONLY executes AFTER dotenv.config() above.
    const { default: redisClient } = await import("./config/redis");
    const { default: app } = await import("./app"); 

    // Now, all configurations are loaded and clients are connected.
    
    const PORT = process.env.Port || 5001;
    ConnectDB(); 
    
    app.listen(PORT, () => {
        console.log(`✅ Server running on port ${PORT}`);
        console.log(`✅ Redis Status: ${redisClient.status}`); // Check connection status
    });
}

// Execute the server startup
startApplication();