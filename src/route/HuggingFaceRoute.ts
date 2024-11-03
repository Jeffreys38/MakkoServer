import { Router } from 'express';
import mailController from "../controller/MailController";

const router = Router();

router.post('/conversation', mailController.sendWelcomeEmail);
router.post('/text-to-image');

export default router;