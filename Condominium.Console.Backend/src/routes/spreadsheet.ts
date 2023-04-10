import { Router } from "express";

import { createSpreadsheet, deleteSpreadsheet, getSpreadsheet, getSpreadsheets, updateSpreadsheet } from "../controllers";
import { validateAdminRole, validateFields, validateJWT } from "../middlewares";
import { createSpreadsheetValidationRules, getSpreadsheetValidationRules, getSpreadsheetsValidationRules, updateSpreadsheetValidationRules } from "../validators";

const router = Router();

router.get(
    '/:spreadsheetId',
    getSpreadsheetValidationRules(),
    validateJWT,
    validateAdminRole,
    validateFields,
    getSpreadsheet
);

router.post(
    '/create',
    createSpreadsheetValidationRules(),
    validateJWT,
    validateAdminRole,
    validateFields,
    createSpreadsheet
);

router.put(
    '/update',
    updateSpreadsheetValidationRules(),
    validateJWT,
    validateAdminRole,
    validateFields,
    updateSpreadsheet
);

router.delete(
    '/:spreadsheetId',
    getSpreadsheetValidationRules(),
    validateJWT,
    validateAdminRole,
    validateFields,
    deleteSpreadsheet
);

router.post(
    '/spreadsheets',
    getSpreadsheetsValidationRules(),
    validateJWT,
    validateAdminRole,
    validateFields,
    getSpreadsheets
);

export default router;