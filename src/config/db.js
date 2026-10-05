import mongoose from "mongoose";
import ENV from "./env.js"

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(ENV.MONGO_URI);
        console.log(`connect to MONGODB: ${connection.host}`)
        return connection;
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        throw error;
    }
}

export default connectDB;