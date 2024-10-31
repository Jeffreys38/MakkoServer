import { Attachment } from "nodemailer/lib/mailer";

abstract class BaseMail {
    protected from: string;
    protected to: string;
    protected subject: string;
    protected template: string;
    protected attachments: Attachment[] = [];

    protected constructor(to: string) {
        this.from = "quocthangngoc13@gmail.com";
        this.to = to;
        this.subject = "";
        this.template = "";
    }

    public abstract setSubject(subject: string): void;
    public abstract setParamsForTemplate(...params: any[]): void;

    public getFrom(): string {
        return this.from;
    }

    public getTo(): string {
        return this.to;
    }

    public getSubject(): string {
        return this.subject;
    }

    public getTemplate(): string {
        return this.template;
    }

    public addAttachment(attachment: Attachment): void {
        this.attachments.push(attachment);
    }
}

export default BaseMail;