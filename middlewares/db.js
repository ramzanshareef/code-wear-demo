import mongoose from "mongoose";
const db_URL = process.env.NEXT_PUBLIC_MONGO_URL;

const connectDB = handler => async (req, res) => {
    if (mongoose.connections[0].readyState) {
        return handler(req, res);
    }
    else {
        await mongoose.connect(db_URL)
        return handler(req, res);
    }
}

export default connectDB;