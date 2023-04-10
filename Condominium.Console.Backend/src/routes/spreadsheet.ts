import { Router } from "express";

import { createSpreadsheet, deleteSpreadsheet, getSpreadsheet, getSpreadsheets, updateSpreadsheet } from "../controllers";

const router = Router();

router.post(
    '/create',
    createSpreadsheet
);

router.put(
    '/update',
    updateSpreadsheet
);

router.get(
    '/:spreadsheetId',
    getSpreadsheet
);

router.delete(
    '/:spreadsheetId',
    deleteSpreadsheet
);

router.post(
    '/spreadsheets', 
    getSpreadsheets
);

export default router;