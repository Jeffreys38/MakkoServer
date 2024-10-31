import { Router } from 'express';
import { conversationController } from '../controller/conversation.controller';
import { mailController } from "../controller/mail.controller";

const router = Router();

router.post('/talk', conversationController);
router.post('/send-verification', mailController);

export default router;
