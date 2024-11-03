import { Router } from 'express';

import prodiaController from "../controller/ProdiaController";
import Makko from "../Makko";

const router = Router();

router.post('/text-to-image', prodiaController.textToImage);

Makko.getLogger().info("/api/prodia/text-to-image POST route initialized");

export default router;