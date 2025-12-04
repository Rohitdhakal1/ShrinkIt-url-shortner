import mongoose from "mongoose";

const ConnectDB = async()=>{
    try {
        const mongo_url = process.env.MONGODB_URI;
        if(!mongo_url){
            throw new Error('MONGO_URI is not defined in the .env file');
        }
        const conn = await mongoose.connect(mongo_url);
        console.log(`MongoDB Connected`);


    } catch (error) {
        console.log(`Error: ${error as Error}.message`);
        process.exit(1);   
    }
}
 export default ConnectDB;
