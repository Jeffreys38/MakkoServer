import { Request, Response } from 'express';
import ConversationService from '../service/conversation.service';
import LoggerFactory from "../util/LoggerFactory";

const conversationService = new ConversationService();

export const conversationController = async (req: Request, res: Response) => {
    try {
        const { text } = req.body;
        const response = await conversationService.talk(text);

        res.status(200).json({ success: true, response });
    } catch (error: any) {
        LoggerFactory.error(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};
