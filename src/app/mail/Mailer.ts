import nodemailer, {Transporter} from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

import Makko from "../../Makko";
import BaseMail from "./BaseMail";

class Mailer {
    private readonly transporter: Transporter<SMTPTransport.SentMessageInfo, SMTPTransport.Options>;

    constructor() {
        if (!process.env.NODEMAILER_HOST) {
            Makko.getLogger().error("NODEMAILER_HOST variables not set in .env");
            process.exit(1);
        }
        if (!process.env.NODEMAILER_PORT) {
            Makko.getLogger().error("NODEMAILER_PORT variables not set in .env");
            process.exit(1);
        }
        if (!process.env.NODEMAILER_SECURE) {
            Makko.getLogger().error("NODEMAILER_SECURE variables not set in .env");
            process.exit(1);
        }
        if (!process.env.NODEMAILER_USER) {
            Makko.getLogger().error("NODEMAILER_USER variables not set in .env");
            process.exit(1);
        }
        if (!process.env.NODEMAILER_PASS) {
            Makko.getLogger().error("NODEMAILER_PASS variables not set in .env");
            process.exit(1);
        }

        this.transporter = nodemailer.createTransport({
            host: process.env.NODEMAILER_HOST,
            port: Number(process.env.NODEMAILER_PORT),
            // secure: process.env.NODEMAILER_SECURE === 'true',
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS
            }
        });

        Makko.getLogger().info("Mailer initialized");
    }

    async sendMail(mail: BaseMail) {
        const info = await this.transporter.sendMail(this.getMailOptions(mail));
        Makko.getLogger().info(`Email sent: ${info.response}`);
    }

    private getMailOptions(mail: BaseMail) {
        return {
            from: mail.getFrom(),
            to: mail.getTo(),
            subject: mail.getSubject(),
            html: mail.getTemplate()
        };
    }
}

export default Mailer;