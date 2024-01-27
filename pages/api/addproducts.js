import Product from "@/models/Product";
import connectDB from "@/middlewares/db";

const handler = async (req, res) => {
    try {
        if (req.method === "POST") {
            for (let i = 0; i < req.body.length; i++) {
                let p = new Product({
                    title: req.body[i].title,
                    slug: req.body[i].slug,
                    description: req.body[i].description,
                    img: req.body[i].img,
                    category: req.body[i].category,
                    size: req.body[i].size,
                    color: req.body[i].color,
                    price: req.body[i].price,
                    availableQty: req.body[i].availableQty,
                })
                await p.save();
            }
            res.status(200).json({
                message: "Products added successfully",
            });
        }
        else {
            res.status(422).json({
                message: "Request method not supported",
            });
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
}

export default connectDB(handler);