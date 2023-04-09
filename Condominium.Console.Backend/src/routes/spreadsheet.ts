import { Router } from "express";

import { createSpreadsheet } from "../controllers";

const router = Router();

router.post(
    '/create',
    createSpreadsheet
);

export default router;