import connectDB from "@/middlewares/db";
import Razorpay from "razorpay";

const handler = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }
    else {
        var instance = new Razorpay({
            key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
        const { amount } = req.body;
        var options = {
            amount: amount * 100,
            currency: "INR",
        };
        instance.orders.create(options, function (err, order) {
            if (err) {
                return res.status(500).json({ error: err });
            }
            else {
                return res.status(200).json({
                    order: order,
                });
            }
        });
    }
}

export default connectDB(handler);