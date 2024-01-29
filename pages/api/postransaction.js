import Order from "@/models/Order";

export default async function handler(req, res) {
    try {
        if (req.method !== "POST") {
            return res.status(405).json({ error: "Method not allowed" });
        }
        const { id } = req.body;
        const paymentID = req.body.paymentID;
        const orderID = req.body.orderID;
        const response = await fetch("https://api.razorpay.com/v1/orders/" + orderID, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    "Basic " + Buffer.from(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID + ":" + process.env.RAZORPAY_KEY_SECRET).toString("base64"),
            },
        });
        const data = await response.json();
        if (data.error) {
            return res.status(500).json({ error: data.error.description });
        }
        else {
            if (data.status === "paid") {
                let order = await Order.findById(id);
                if (!order) {
                    return res.status(404).json({ error: "Order not found" });
                }
                order.status = "paid";
                order.paymentID = paymentID;
                order.orderID = orderID;
                await order.save();
                return res.status(200).json({
                    message: "Order updated successfully",
                    order: order,
                });
            }
            else if (data.amount !== req.body.amount){
                return res.status(500).json({ error: "Payment not successful" });
            }
            else {
                return res.status(500).json({ error: "Payment not successful" });
            }
        }
    }
    catch (err) {
        return res.status(500).json({ error: err.messsge });
    }
}