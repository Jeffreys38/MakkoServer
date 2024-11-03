import { Router } from 'express';

import mailController from "../controller/MailController";
import Makko from "../Makko";

const router = Router();

router.post('/welcome', mailController.sendWelcomeEmail);
router.post('/otp', mailController.sendOtpMail);
router.post('/reset-password', mailController.sendResetPasswordEmail);

Makko.getLogger().info("/api/mail/welcome POST route initialized");
Makko.getLogger().info("/api/mail/otp POST route initialized");
Makko.getLogger().info("/api/mail/reset-password POST route initialized");

export default router;