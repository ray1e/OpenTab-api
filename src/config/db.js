import mongoose from "mongoose";
import ENV from "./env.js"

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(ENV.MONGO_URI);
        console.log(`connected to MONGODB: ${conn.connection.host}`)
        return conn.connection;
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        throw error;
    }
}

export default connectDB;