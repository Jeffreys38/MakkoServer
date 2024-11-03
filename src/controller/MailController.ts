import Makko from "../Makko";
import {Request, Response} from 'express';
import LoggerFactory from "../util/LoggerFactory";
import OtpVerificationEmail from "../app/mail/OtpVerificationEmail";
import WelcomeMail from "../app/mail/WelcomeMail";

class MailController {
    async sendOtpMail(req: Request, res: Response) {
        try {
            const { email, receiverName } = req.body;
            const otpVerificationMail = new OtpVerificationEmail(email);
            otpVerificationMail.setParamsForTemplate(receiverName);

            await Makko.getConfig().mailer.sendMail(otpVerificationMail);
            res.status(200).json({ success: true, message: "OTP email sent" });
        } catch (error: any) {
            LoggerFactory.error(error.message);
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async sendWelcomeEmail(req: Request, res: Response) {
        try {
            const { email, receiverName } = req.body;
            const welcomeMail = new WelcomeMail(email);

            await Makko.getConfig().mailer.sendMail(welcomeMail);
            res.status(200).json({ success: true, message: "Welcome email sent" });
        } catch (error: any) {
            LoggerFactory.error(error.message);
            res.status(500).json({success: false, message: error.message});
        }
    }

    async sendResetPasswordEmail(req: Request, res: Response) {
        try {

        } catch (error: any) {
            LoggerFactory.error(error.message);
            res.status(500).json({success: false, message: error.message});
        }
    }
}

export default new MailController();