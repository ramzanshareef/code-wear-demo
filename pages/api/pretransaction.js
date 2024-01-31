import connectDB from "@/middlewares/db";
import Order from "@/models/Order";
import Product from "@/models/Product";
import User from "@/models/User";

const handler = async (req, res) => {
    try {
        if (req.method !== "POST") {
            res.status(405).json({ error: "Method not allowed" });
        }
        else {
            const amountRequest = req.body.amount;
            if (!amountRequest || amountRequest <= 0) {
                return res.status(500).json({ error: "Invalid amount" });
            }
            let amountActual = 0;
            const producstsRequest = req.body.products;
            for (let key in producstsRequest) {
                let product = await Product.findById(key);
                if (!product) {
                    return res.status(404).json({ error: "Some Products were not found" });
                }
                if (product.availableQty < producstsRequest[key].qty) {
                    return res.status(500).json({ error: "Some Products are not available" });
                }
                if (product.price !== producstsRequest[key].price) {
                    return res.status(500).json({ error: "The price of items in your cart have been changed, Please try again" });
                }
                amountActual += product.price * producstsRequest[key].qty;
            }
            if (amountActual !== amountRequest) {
                return res.status(500).json({ error: "The price of items in your cart have been changed, Please try again" });
            }
            let user = await User.findOne({ email: req.body.email }).select("name email phoneno");
            const newOrder = new Order({
                email: req.body.email,
                userDetails: user,
                address: req.body.address,
                amount: req.body.amount,
                products: req.body.products,
            })
            await newOrder.save();
            return res.status(200).json({
                message: "Order saved successfully",
                order: newOrder,
            });
        }

    }
    catch (err) {
        res.status(500).json({ error: err.messsge });
    }
}

export default connectDB(handler);