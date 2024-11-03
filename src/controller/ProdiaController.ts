import { Request, Response } from 'express';

import Makko from "../Makko";
import Prodia from "../module/Prodia";

class ProdiaController {
    private readonly prodia: Prodia;

    constructor() {
        this.prodia = Makko.getProdia();

        // Bind the method to the instance
        this.textToImage = this.textToImage.bind(this);
    }

    async textToImage(req: Request, res: Response) {
        try {
            const { text, negative_prompt } = req.body;
            const imageUrl = await this.prodia.convertTextToImage(text, negative_prompt);

            res.status(200).json({ success: true, message: imageUrl });
        } catch (error: any) {
            Makko.getLogger().error(error.message);
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

export default new ProdiaController();