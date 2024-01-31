import connectDB from "@/middlewares/db"
import Forget from "@/models/Forget";

const handler = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(400).json({ message: "Method not allowed" });
    }
    else {
        try {
            if (req.body.sendMail === true) {
                let token = "dhgjhdfkgjhdfgk";
                let email = `We got your request to reset your password. Please click on the link below to reset your password. If you did not request a password reset, you can safely ignore this email.
                
                To reset your password, visit the following address:
                <a>http://localhost:3000/resetpassword/${token}</a>
            
                If clicking the link above doesn't work, please copy and paste the URL in a new browser window instead.
            
                Thanks,
                The CodeWear Team.
                `;

                let forgot = await Forget.create({
                    email: req.body.email,
                    token: token,
                })


                res.status(200).json({ message: "Email sent" });
            }
            else {
                res.status(200).json({
                    message: "Password updated",
                    data: req.body
                });
            }
        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }


}

export default connectDB(handler);