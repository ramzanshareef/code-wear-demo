import connectDB from "@/middlewares/db";
import Order from "@/models/Order";
import User from "@/models/User";

const jwt = require("jsonwebtoken");

const handler = async (req, res) => {
    try {
        if (req.method !== "POST") {
            return res.status(405).json({ message: "Method not allowed" });
        }
        else {
            const { token } = req.body;
            const tokenDecryptes = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
            const user = await User.findOne({ email: tokenDecryptes.userEmail }).select("-password");
            const orders = await Order.find({ email: user.email }).sort({ updatedAt: -1 })
            return res.status(200).json({
                message: "User found",
                user: user,
                orders: orders
            });
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

export default connectDB(handler);