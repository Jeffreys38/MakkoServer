import BaseMail from "./BaseMail";
import Makko from "../../Makko";

class ResetPasswordEmail extends BaseMail {
    private expiredTime: Date;

    constructor(to: string) {
        super(to);
        this.expiredTime = new Date();
        this.expiredTime.setMinutes(this.expiredTime.getMinutes() + 10);
        this.subject = "Reset Password Link";
    }

    public setSubject(otp: string): void {
        this.subject = otp;
    }

    public setParamsForTemplate(receiverName: string, otp: string): void {

    }
}

export default ResetPasswordEmail;