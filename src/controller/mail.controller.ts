import MailService from "../service/mail.service";
import { Request, Response } from 'express';
import LoggerFactory from "../util/LoggerFactory";

export const mailController = async (req: Request, res: Response) => {
    try {
        const { email, receiverName, code, expiredTime } = req.body;
        const response = await MailService.getInstance().sendVerificationCode({
            email,
            receiverName,
            code,
            expiredTime
        });

        res.status(200).json({ success: true, response });
    } catch (error: any) {
        LoggerFactory.error(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};
