import pinCodes from "../../data/pincodes.json";
export default function handler(req, res) {
    const pincodes = pinCodes;
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }
    else {
        const { pincode } = req.body;
        if (!pincode) {
            return res.status(400).json({ error: "Pincode is required" });
        }
        if (!pincodes[pincode]) {
            return res.status(404).json({ error: "Pincode not found" });
        }
        return res.status(200).json({
            data: pincodes[pincode]
        });
    }
}  