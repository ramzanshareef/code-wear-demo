import Order from "@/models/Order";
import Product from "@/models/Product";
const crypto = require("crypto");

export default async function handler(req, res) {
    try {
        if (req.method !== "POST") {
            return res.status(405).json({ error: "Method not allowed" });
        }
        const { id } = req.body;
        const paymentID = req.body.paymentID;
        const orderID = req.body.orderID;
        const payment_signature = req.body.payment_signature;
        const response= await fetch("https://api.razorpay.com/v1/payments/" + paymentID, {
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
            let expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(orderID + "|" + paymentID).digest("hex");
            if (expectedSignature !== payment_signature) {
                return res.status(500).json({ error: "Payment not successful" });
            }
            else{
                if (data.status === "captured" && data.amount === req.body.amount && data.currency === "INR" && data.order_id === orderID) {
                    let order = await Order.findById(id);
                    if (!order) {
                        return res.status(404).json({ error: "Order not found" });
                    }
                    order.payment_status = "paid";
                    order.paymentID = paymentID;
                    order.orderID = orderID;
                    order.payment_info = data;
                    let cart = req.body.cart;
                    for (let key in cart) {
                        let product = await Product.findById(key);
                        if (!product) {
                            return res.status(404).json({ error: "Some Products were not found" });
                        }
                        if (product.availableQty < cart[key].qty) {
                            return res.status(500).json({ error: "Some Products are not available" });
                        }
                        product.availableQty -= cart[key].qty;
                        await product.save();
                    }
                    await order.save();
                    return res.status(200).json({
                        message: "Order updated successfully",
                        order: order,
                    });
                }
                else if (Math.floor(data.amount/100) !== req.body.amount) {
                    return res.status(500).json({ error: "Payment not successful" });
                }
                else {
                    return res.status(500).json({ error: "Payment not successful" });
                }
            }
        }
    }
    catch (err) {
        return res.status(500).json({ error: err.messsge });
    }
}