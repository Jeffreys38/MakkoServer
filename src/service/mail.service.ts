import 'dotenv/config';
import SMTPTransport from "nodemailer/lib/smtp-transport";
import nodemailer, {Transporter} from 'nodemailer';
import fs from 'fs';
import path from "path";

import VertificationFields, {
    Vertification_Default_Fields,
    Vertification_Required_Fields
} from "../constant/VerificationFields";

const vertification_Default_Fields: Vertification_Default_Fields = {
    'logo-src': 'https://firebasestorage.googleapis.com/v0/b/makko-social-network.appspot.com/o/image.jpg?alt=media&token=1b7362c6-6073-4877-9024-2a2683f8d016',
    'company-name': process.env.APP_NAME,
    'year': new Date().getFullYear().toString(),
    'link-1': 'https://www.google.com',
    'link-2': 'https://www.facebook.com',
    'link-3': 'https://www.twitter.com',
};

class MailService {
    private static instance: MailService;
    private readonly transporter: Transporter<SMTPTransport.SentMessageInfo, SMTPTransport.Options>;
    private readonly from = "'Makko Social Network' <abc@gmail.com>";

    private constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.NODEMAILER_HOST,
            port: Number(process.env.NODEMAILER_PORT),
            // secure: process.env.NODEMAILER_SECURE === 'true',
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS
            }
        });
    }

    public static getInstance(): MailService {
        if (!MailService.instance) {
            MailService.instance = new MailService();
        }

        return MailService.instance;
    }

    public async sendVerificationCode(
        {
            email,
            receiverName,
            code,
            expiredTime
        }: {
            email: string,
            receiverName: string,
            code: string,
            expiredTime: string
        }): Promise<boolean> {
        // Validate that the code is a 6-digit number
        if (!/^\d{6}$/.test(code)) {
            console.debug('Must provide a 6-digit number for OTP');
            return false;
        }

        const templatePath = path.join(__dirname, 'templates', 'OtpVerificationTemplate.html');
        let htmlContent = fs.readFileSync(templatePath, 'utf-8');

        const vertification_Required_Fields: Vertification_Required_Fields = {
            'receiver-name': receiverName,
            'otp-1': code.charAt(0),
            'otp-2': code.charAt(1),
            'otp-3': code.charAt(2),
            'otp-4': code.charAt(3),
            'otp-5': code.charAt(4),
            'otp-6': code.charAt(5),
            'expired-time': expiredTime,
        };

        htmlContent = this.replaceTemplate(htmlContent, {
            ...vertification_Required_Fields,
            ...vertification_Default_Fields
        });

        await this.transporter.sendMail({
            from: this.from,
            to: email,
            subject: "Verification Code",
            html: htmlContent
        });
        return true;
    }

    private replaceTemplate(htmlContent: string, fields: VertificationFields): string {
        for (const key in fields) {
            const value = fields[key as keyof VertificationFields];
            if (value) {
                htmlContent = htmlContent.replaceAll(`{{ ${key} }}`, value);
            }
        }
        return htmlContent;
    }
}

export default MailService;