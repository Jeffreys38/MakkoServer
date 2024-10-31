import OtpVerificationEmail from '../OtpVerificationEmail';
import Makko from '../../../Makko';

describe('Test MailService', () => {
    const to = "quocthangngoc14@gmail.com";

    test('OtpVerificationEmail should send an email correctly', () => {
        const mail = new OtpVerificationEmail(to);

        // Act: Set the parameters for the template and send the email
        mail.setParamsForTemplate("Thang", "123456");
        Makko.getConfig().mailer.sendMail(mail);
    });
});
