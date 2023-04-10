import { Router } from "express";

import { createSpreadsheet, updateSpreadsheet } from "../controllers";

const router = Router();

router.post(
    '/create',
    createSpreadsheet
);

router.put(
    '/update',
    updateSpreadsheet
);

export default router;