import connectDB from "@/middlewares/db";
import User from "@/models/User";
const bcrypt = require("bcryptjs");

const handler = async (req, res) => {
    try {
        if (req.method === "POST") {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                return res.status(422).json({
                    message: "Invalid input",
                });
            }
            let newUser = await User.findOne({ email });
            if (newUser) {
                return res.status(422).json({
                    message: "User already exists",
                });
            }
            const salt = bcrypt.genSaltSync(12);
            const hashedPassword = bcrypt.hashSync(password, salt);
            newUser = new User({
                name,
                email,
                password: hashedPassword,
            });
            await newUser.save();
            res.status(200).json({
                message: "Signup successful",
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