import Order from "@/models/Order";

export default async function handler(req, res) {
    try {
        if (req.method !== "POST") {
            res.status(405).json({ error: "Method not allowed" });
        }
        const newOrder = new Order({
            email: req.body.email,
            address: req.body.address,
            amount: req.body.amount,
            products: req.body.products,
        })
        await newOrder.save();
        res.status(200).json({
            message: "Order saved successfully",
            order: newOrder,
        });
    }
    catch (err) {
        res.status(500).json({ error: err.messsge });
    }
}