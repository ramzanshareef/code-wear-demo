import connectDB from "@/middlewares/db";
import User from "@/models/User";

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const handler = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(400).json({
            message: "Request method not supported"
        });
    }
    else {
        try {
            let updateFields = {};
            let token = req.body.token;
            if (req.body.name) updateFields.name = req.body.name;
            if (req.body.address) updateFields.address = req.body.address;
            if (req.body.phoneno) updateFields.phoneno = req.body.phoneno;
            if (req.body.pincode) updateFields.pincode = req.body.pincode;
            let confirmpassword = req.body.confirmpassword;
            if (confirmpassword !== req.body.password) {
                return res.status(400).json({
                    message: "Please check your fields"
                });
            }
            let decUser = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
            let user = await User.findOne({ email: decUser.userEmail });
            if (!user) {
                return res.status(400).json({
                    message: "User not found"
                });
            }
            if (req.body.password && req.body.oldpassword) {
                if (bcrypt.compareSync(req.body.oldpassword, user.password) === false) {
                    return res.status(400).json({
                        message: "Incorrect old password"
                    });
                }
                else {
                    updateFields.password = bcrypt.hashSync(req.body.password, 12);
                }
            }
            await User.findOneAndUpdate({ email: decUser.userEmail }, updateFields);
            user = await User.findOne({ email: decUser.userEmail }).select("-password");
            return res.status(200).json({
                message: "User updated successfully",
                user: user
            });

        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
};

export default connectDB(handler);