import connectDB from "@/middlewares/db";
import Order from "@/models/Order";

const handler = async (req, res) => {
    try {
        if (req.method !== "POST") {
            res.status(405).json({ error: "Method not allowed" });
        }
        const orderID = req.body.orderID;
        await Order.findByIdAndDelete(orderID);
        res.status(200).json({
            message: "Order deleted successfully from the database"
        });
    }
    catch (err) {
        res.status(500).json({ error: err.messsge });
    }
}
export default connectDB(handler);