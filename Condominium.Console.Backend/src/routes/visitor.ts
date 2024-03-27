import { Router } from "express";
import { createVisitorRecord, deleteVisitor, getVisitor, getVisitors, updateVisitor } from "../controllers";
import { validateFields, validateJWT, validateRole } from "../middlewares";
import { createVisitorValidationRules, getVisitorValidationRules, getVisitorsValidationRules, updateVisitorValidationRules } from "../validators";

const router = Router();
/**
 * @swagger
 * /api/visitor/{id}:
 *   get:
 *     summary: Get visitor by Id
 *     tags: [Visitor]
 *     parameters:
 *     - name: id
 *       in: path
 *       description: Visitor ID.
 *       required: true
 *       schema:
 *        type: string
 *     responses:
 *       200:
 *         description:  
 *         content:
 *           application/json:
 *             example:
 *               incident:
 *                  id: 1
 *                  name: Julio Ramirez
 *                  dpi: 3639933470101
 *                  homeAddress: Casa 1
 *                  createdAt: 27-04-2023 06:00:00.000Z
 *               statusCode: 200
 *       404:
 *         description: Visitor not found
 *       422:
 *         description: Fields Error
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errors:
 *                  type: object
 *                  example: {"errors":[{"field":"Id","message":{"requiredType":"string","warnings":"The field does not exist, is not a string or is empty."}}]}
 */
router.get(
    '/:visitorId',
    getVisitorValidationRules(),
    validateJWT,
    validateRole(1,2),
    validateFields,
    getVisitor
);

/**
 * @swagger
 * /api/visitor/create:
 *   post:
 *     summary: Register visitor
 *     tags: [Visitor]
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - name
 *                - dpi
 *                - homeAddress
 *              properties:
 *               name:
 *                   type: string
 *                   description: Visitor's name.
 *                   example: Julio Ramirez
 *               dpi:
 *                   type: string
 *                   description: Visitor's DPI.
 *                   example: 363993347010112
 *               homeAddress:
 *                   type: string
 *                   description: Home address about visitor.
 *                   example: Casa 40
 *                  
 *     responses:
 *       200:
 *         description:  
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               statusCode: 200
 *       400:
 *         description: Unkown error
 *       422:
 *         description: Fields Error
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errors:
 *                  type: object
 *                  example: {"errors":[{"field":"name","message":{"requiredType":"string","warnings":"The field does not exist, is not a string or is empty."}}]}
 */
router.post(
    '/create',
    createVisitorValidationRules(),
    validateJWT,
    validateRole(1,2),
    validateFields,
    createVisitorRecord
);

/**
 * @swagger
 * /api/visitor/update:
 *   put:
 *     summary: Update visitor
 *     tags: [Visitor]
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - id
 *                - name
 *                - dpi
 *                - homeAddress
 *              properties:
 *               id:
 *                   type: integer
 *                   description: Visitor ID
 *                   example: 3
 *               name:
 *                   type: string
 *                   description: Visitor's name.
 *                   example: Julio Ramirez
 *               dpi:
 *                   type: string
 *                   description: Visitor's DPI.
 *                   example: 363993347010112
 *               homeAddress:
 *                   type: string
 *                   description: Home address about visitor.
 *                   example: Casa 40
 *                  
 *     responses:
 *       200:
 *         description:  
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 200
 *       400:
 *         description: Unkown error
 *       422:
 *         description: Fields Error
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errors:
 *                  type: object
 *                  example: {"errors":[{"field":"name","message":{"requiredType":"string","warnings":"The field does not exist, is not a string or is empty."}}]}
 */
router.put(
    '/update',
    updateVisitorValidationRules(),
    validateJWT,
    validateRole(1,2),
    validateFields,
    updateVisitor
);

/**
 * @swagger
 * /api/visitor/{id}:
 *   delete:
 *     summary: Delete visitor by Id
 *     tags: [Visitor]
 *     parameters:
 *     - name: id
 *       in: path
 *       description: Visitor ID.
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
 *         description: Visitor not found
 *       422:
 *         description: Fields Error
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errors:
 *                  type: object
 *                  example: {"errors":[{"field":"Id","message":{"requiredType":"string","warnings":"The field does not exist, is not a string or is empty."}}]}
 */
router.delete(
    '/delete/:visitorId',
    getVisitorValidationRules(),
    validateJWT,
    validateRole(1,2),
    validateFields,
    deleteVisitor
);

/**
 * @swagger
 * /api/visitor/visitors:
 *   post:
 *     summary: Get vvisitors paginated
 *     tags: [Visitor]
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
 *     responses:
 *       200:
 *         description:  
 *         content:
 *           application/json:
 *             example:
 *               data: [{"id":4,"name":"test","dpi":"3639933470101","homeAddress":"Casa 3","createdAt":"2023-04-28T00:45:53.003Z"},{"id":2,"name":"test","dpi":"3639933470101","homeAddress":"Casa 3","createdAt":"2023-04-27T03:43:02.333Z"}]
 *               count: 10 
 *               page: 1
 *               pages: 3
 *               statusCode: 200
 *       400:
 *         description: Unkwon error
 *       422:
 *         description: Fields Error
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errors:
 *                  type: object
 *                  example: {"errors":[{"field":"pageSize","message":{"requiredType":"string","warnings":"The field does not exist, is not a string or is empty."}}]}
 */
router.post(
    '/visitors',
    getVisitorsValidationRules(),
    validateJWT,
    validateRole(1,2),
    validateFields,
    getVisitors
)

export default router;