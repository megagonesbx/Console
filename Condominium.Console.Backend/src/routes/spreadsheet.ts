import { Router } from "express";

import { createSpreadsheet, deleteSpreadsheet, getSpreadsheet, getSpreadsheets, updateSpreadsheet } from "../controllers";
import { validateAdminRole, validateFields, validateJWT } from "../middlewares";
import { createSpreadsheetValidationRules, getSpreadsheetValidationRules, getSpreadsheetsValidationRules, updateSpreadsheetValidationRules } from "../validators";

const router = Router();

/**
 * @swagger
 * /api/spreadsheet/{id}:
 *   get:
 *     summary: Get spreadsheet by Id
 *     tags: [Spreadsheet]
 *     parameters:
 *     - name: id
 *       in: path
 *       description: Spreadsheet ID.
 *       required: true
 *       schema:
 *        type: integer
 *     responses:
 *       200:
 *         description:  
 *         content:
 *           application/json:
 *             example:
 *               spreadsheet:
 *                  Id: 1
 *                  Name: Pago Enero - Developer Freelance
 *                  DPI: 1234567891230102
 *                  CreatedAt: 2023-04-09T21:08:41.000Z
 *                  PaymentMonth: 1
 *               statusCode: 200
 *       404:
 *         description: Spreadsheet not found
 *       422:
 *         description: Fields Error
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errors:
 *                  type: object
 *                  example: {"errors":[{"field":"DPI","message":{"requiredType":"integer","warnings":"The field does not exist or must be greather than 0."}}]}
 */
router.get(
    '/:spreadsheetId',
    getSpreadsheetValidationRules(),
    validateJWT,
    validateAdminRole,
    validateFields,
    getSpreadsheet
);

/**
 * @swagger
 * /api/spreadsheet/create:
 *   post:
 *     summary: Create spreadsheet
 *     tags: [Spreadsheet]
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - name
 *                - dpi
 *                - paymentMonth
 *              properties:
 *               name:
 *                   type: string
 *                   description: name of the spreadsheet to be created.
 *                   example: Pago Enero 2023 - Developer Freelance
 *               dpi:
 *                   type: integer
 *                   description: DPI number.
 *                   example:  123456789120102
 *               paymentMonth:
 *                   type: integer
 *                   description: Number of the month
 *                   example: 1
 *                  
 *     responses:
 *       200:
 *         description:  
 *         content:
 *           application/json:
 *             example:
 *               spreadsheet:
 *                  Id: 1
 *                  Name: Pago Enero - Developer Freelance
 *                  DPI: 1234567891230102
 *                  CreatedAt: 2023-04-09T21:08:41.000Z
 *                  PaymentMonth: 1
 *               statusCode: 200
 *       404:
 *         description: Spreadsheet not found
 *       422:
 *         description: Fields Error
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errors:
 *                  type: object
 *                  example: {"errors":[{"field":"dpi","message":{"requiredType":"integer","warnings":"The field does not exist or must be greather than 0."}}]}
 */
router.post(
    '/create',
    createSpreadsheetValidationRules(),
    validateJWT,
    validateAdminRole,
    validateFields,
    createSpreadsheet
);

/**
 * @swagger
 * /api/spreadsheet/update:
 *   put:
 *     summary: Update spreadsheet
 *     tags: [Spreadsheet]
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - name
 *                - dpi
 *                - paymentMonth
 *              properties:
 *               name:
 *                   type: string
 *                   description: name of the spreadsheet to be created.
 *                   example: Pago Enero 2023 - Developer Freelance
 *               dpi:
 *                   type: integer
 *                   description: DPI number.
 *                   example:  123456789120102
 *               paymentMonth:
 *                   type: integer
 *                   description: Number of the month
 *                   example: 1
 *                  
 *     responses:
 *       200:
 *         description:  
 *         content:
 *           application/json:
 *             example:
 *               spreadsheet:
 *                  Id: 1
 *                  Name: Pago Enero - Developer Freelance Actualizado
 *                  DPI: 1234567891230102
 *                  CreatedAt: 2023-04-09T21:08:41.000Z
 *                  PaymentMonth: 3
 *               statusCode: 200
 *       404:
 *         description: Spreadsheet not found
 *       422:
 *         description: Fields Error
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errors:
 *                  type: object
 *                  example: {"errors":[{"field":"dpi","message":{"requiredType":"integer","warnings":"The field does not exist or must be greather than 0."}}]}
 */
router.put(
    '/update',
    updateSpreadsheetValidationRules(),
    validateJWT,
    validateAdminRole,
    validateFields,
    updateSpreadsheet
);

/**
 * @swagger
 * /api/spreadsheet/{id}:
 *   delete:
 *     summary: Delete spreadsheet by Id
 *     tags: [Spreadsheet]
 *     parameters:
 *     - name: id
 *       in: path
 *       description: Spreadsheet ID.
 *       required: true
 *       schema:
 *        type: string
 *     responses:
 *       200:
 *         description:  
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 200
 *       404:
 *         description: Spreadsheet not found
 *       422:
 *         description: Fields Error
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errors:
 *                  type: object
 *                  example: {"errors":[{"field":"dpi","message":{"requiredType":"integer","warnings":"The field does not exist or must be greather than 0."}}]}
 */
router.delete(
    '/:spreadsheetId',
    getSpreadsheetValidationRules(),
    validateJWT,
    validateAdminRole,
    validateFields,
    deleteSpreadsheet
);

/**
 * @swagger
 * /api/spreadsheet/spreadsheets:
 *   post:
 *     summary: Get spreadsheets paginated
 *     tags: [Spreadsheet]
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *               pageSize:
 *                   type: integer
 *                   description: Number of documents per page, by default is 10 documents per page
 *                   example: 15
 *               page:
 *                   type: Integer
 *                   description: Number of page, by default will be the page number 1
 *                   example: 1
 *               dpi:
 *                   type: Integer
 *                   description: DPI number to filter spreadsheets, is not required.
 *                   example: 123456789120102
 *     responses:
 *       200:
 *         description:  
 *         content:
 *           application/json:
 *             example:
 *               data: [{"Id":2,"Name":"Pago 2","DPI":"123456789120102","CreatedAt":"2023-04-09T21:08:41.000Z","PaymentMonth":1},{"Id":1,"Name":"Pago 1","DPI":"123456789120103","CreatedAt":"2023-04-09T21:08:22.000Z","PaymentMonth":4}]
 *               count: 2 
 *               page: 1
 *               pages: 1
 *               statusCode: 200
 *       404:
 *         description: User not found
 *       422:
 *         description: Fields Error
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errors:
 *                  type: object
 *                  example: {"errors":[{"field":"dpi","message":{"requiredType":"integer","warnings":"The field does not exist or must be greather than 0."}}]}
 */
router.post(
    '/spreadsheets',
    getSpreadsheetsValidationRules(),
    validateJWT,
    validateAdminRole,
    validateFields,
    getSpreadsheets
);

export default router;