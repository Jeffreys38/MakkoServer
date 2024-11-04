import { Request, Response } from 'express';
import mailController from '../../../controller/MailController';
import Makko from '../../../Makko';

jest.mock('../../../Makko', () => ({
    __esModule: true,
    default: {
        getConfig: jest.fn().mockReturnValue({
            mailer: {
                sendMail: jest.fn(),
            },
            firebase: {
                storage: 'mockStorageInstance',
            },
        }),
    },
}));

jest.mock('../../../app/mail/ResetPasswordEmail');

describe('Reset Password Email', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let sendMailSpy: jest.SpyInstance;

    beforeEach(() => {
        req = {
            body: {
                email: 'quocthangngoc14@gmail.com',
                receiverName: 'Test User 1'
            }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        sendMailSpy = jest.spyOn(Makko.getConfig().mailer, 'sendMail');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should respond with code 200 when OTP email is sent successfully', async () => {
        sendMailSpy.mockResolvedValueOnce(undefined); // Giả lập thành công

        await mailController.sendResetPasswordEmail(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ success: true, message: "Reset email sent" });
    });

    it('should respond with code 500 when sendMail throws an error', async () => {
        sendMailSpy.mockRejectedValueOnce(new Error('Failed to send email')); // Giả lập lỗi

        await mailController.sendResetPasswordEmail(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Failed to send email' });
    });
});
