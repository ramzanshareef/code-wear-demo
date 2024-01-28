import connectDB from "@/middlewares/db";
import User from "@/models/User";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const handler = async (req, res) => {
    try {
        if (req.method === "POST") {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(422).json({
                    message: "Invalid Credentials",
                });
            }
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({
                    message: "Invalid Credentials",
                });
            }
            else {
                const decryptedPassword = bcrypt.compareSync(password, user.password);
                if (decryptedPassword === false) {
                    return res.status(404).json({
                        message: "Invalid Credentials",
                    });
                }
                else {
                    const token = jwt.sign({
                        userName: user.name,
                        userEmail: user.email
                    },"jwtSecret")
                    
                    // const token = jwt.sign({
                    //     userName: user.name,
                    //     userEmail: user.email
                    // },"jwtSecret", { expiresIn: "1h" }) // expires the token in 1 hour
                    
                    res.status(200).json({
                        message: "Login successful",
                        token: token
                    });
                }
            }
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