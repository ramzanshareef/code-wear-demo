const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    userDetails: {
        type: Object,
    },
    orderID: {
        type: String,
    },
    paymentID: {
        type: String,
    },
    products: {
        type: Array,
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
    payment_status: {
        type: String,
        default: "pending",
    },
    payment_info: {
        type: Object,
    },

}, {
    timestamps: true,
});

mongoose.models = {};
const Order = mongoose.model("order", OrderSchema);

export default Order;