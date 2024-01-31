const mongoose = require("mongoose");

const ForgotSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    token: {
        type: String,
    },
}, {
    timestamps: true,
});

export default mongoose.models.forgot || mongoose.model("forgot", ForgotSchema);