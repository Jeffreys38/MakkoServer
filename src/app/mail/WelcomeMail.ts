import BaseMail from "./BaseMail";

class WelcomeEmail extends BaseMail {
    constructor(to: string) {
        super(to);
        this.subject = "Welcome to Makko";
    }

    public setSubject(otp: string): void {
        this.subject = otp;
    }

    public setParamsForTemplate(receiverName: string, otp: string): void {

    }
}

export default WelcomeEmail;