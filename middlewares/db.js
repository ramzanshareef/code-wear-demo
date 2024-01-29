import mongoose from "mongoose";
const db_URL = process.env.NEXT_PUBLIC_MONGO_URL || "mongodb://127.0.0.1:27017/ecommerce";

const connectDB = handler => async (req, res) =>{
    if (mongoose.connections[0].readyState){
        return handler(req, res);
    }
    await mongoose.connect(db_URL)
    return handler(req, res);
}

export default connectDB;