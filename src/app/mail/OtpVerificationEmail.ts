import fs from 'fs';

import BaseMail from "./BaseMail";
import Makko from "../../Makko";
import path from "path";

class OtpVerificationEmail extends BaseMail {
    private readonly otp: string;
    private expiredTime: Date;

    constructor(to: string) {
        super(to);
        this.expiredTime = new Date();
        this.expiredTime.setMinutes(this.expiredTime.getMinutes() + 10);
        this.subject = "Your OTP code";
        this.otp = Math.random().toString().slice(2, 8);
    }

    public setSubject(otp: string): void {
        this.subject = otp;
    }

    public getOtp(): string {
        return this.otp;
    }

    public setParamsForTemplate(receiverName: string): void {
        const templateFile = "templates/OtpVerificationTemplate.html";
        const templateFilePath = path.join(__dirname, templateFile);
        let templateContent = "";

        try {
            templateContent = fs.readFileSync(templateFilePath, "utf8");
        } catch (err: any) {
            if (err.code === 'ENOENT') Makko.getLogger().error(`OtpVerificationEmail template is not found!`);
        }

        const logoSrc = "https://images.pexels.com/photos/28973930/pexels-photo-28973930/free-photo-of-historic-saigon-central-post-office-architecture.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
        templateContent = templateContent
            .replace("{{ logo-src }}", logoSrc)
            .replace("{{ otp-1 }}", this.otp[0])
            .replace("{{ otp-2 }}", this.otp[1])
            .replace("{{ otp-3 }}", this.otp[2])
            .replace("{{ otp-4 }}", this.otp[3])
            .replace("{{ otp-5 }}", this.otp[4])
            .replace("{{ otp-6 }}", this.otp[5])
            .replace("{{ year }}", new Date().getFullYear().toString())
            .replaceAll("{{ receiver-name }}", receiverName)
            .replaceAll("{{ company-name }}", Makko.getConfig().companyName)
            .replaceAll("{{ expired-time }}", "10 minutes");
        this.template = templateContent;
    }
}

export default OtpVerificationEmail;