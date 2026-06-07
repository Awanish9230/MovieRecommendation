import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        if(!process.env.MONGO_URI){
            throw new Error("MONGO_URI not found in environment variable");
        }
        mongoose.set("strictQuery", true);
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected ${conn.connection.host}`);
    } catch (error) {
        console.error("DB connection error", error.message);
        process.exit(1);
    }
};