const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
    },
    products: [
        {
            productId: { type: String },
            quantity: { type: Number, default: 1},
        }
    ],
    addres: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        default: "pending",
    },
    
},{
    timestamps: true,
});

const Order = mongoose.model("order", OrderSchema);

module.exports = {
    Order,
}