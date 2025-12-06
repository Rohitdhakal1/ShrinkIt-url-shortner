import dotenv from "dotenv";
import ConnectDB from "./config/db";

//Load environment variables FIRST otherwise redis give error to find env file.
dotenv.config(); 

// 2.it helps to stop redis so that ev load first then redis
async function startApplication() {

    const { default: redisClient } = await import("./config/redis");
    const { default: app } = await import("./app"); 

    // Now, all configurations are loaded and clients are connected yehh haha.
    
    const PORT = process.env.Port || 5001;
    ConnectDB(); 
    
    app.listen(PORT, () => {
        console.log(`✅ Server running on port ${PORT}`);
        console.log(`✅ Redis Status: ${redisClient.status}`); // Check connection status
    });
}

// Execute the server startup most important i already forget to do this many time
startApplication();
