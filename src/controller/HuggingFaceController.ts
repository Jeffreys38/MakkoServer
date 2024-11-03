import Makko from "../Makko";
import {Request, Response} from 'express';

class HuggingFaceController {
    async sendOtpMail(req: Request, res: Response) {
        try {
            const { email, receiverName } = req.body;

            res.status(200).json({ success: true, message: "OTP email sent" });
        } catch (error: any) {
            Makko.getLogger().error(error.message);
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

export default new HuggingFaceController();