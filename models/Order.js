const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    orderID:{
        type: String,
    },
    paymentID:{
        type: String,
    },
    products: {
        type: Object,
        required: true,
    },
    address: {
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

mongoose.models = {};
const Order = mongoose.model("order", OrderSchema);

export default Order;