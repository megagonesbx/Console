import { Router } from "express";

import { createIncident, getIncident, updateIncident, deleteIncident, getIncidents } from '../controllers';

import { createIncidentValidationRules, getIncidentValidationRules, getIncidentsValidationRules, updateIncidentValidationRules } from "../validators";
import { validateRole, validateFields, validateJWT } from "../middlewares";

const router = Router();

/**
 * @swagger
 * /api/incident/{id}:
 *   get:
 *     summary: Get report by Id
 *     tags: [Report]
 *     parameters:
 *     - name: id
 *       in: path
 *       description: Report ID.
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
 *                  incidentName: Trash
 *                  description: Swagger
 *                  incidentEvidence: base64....
 *               statusCode: 200
 *       404:
 *         description: Report not found
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
    '/:incidentId',
    getIncidentValidationRules(),
    validateJWT,
    validateRole(1,2),
    validateFields,
    getIncident
);

/**
 * @swagger
 * /api/incident/create:
 *   post:
 *     summary: Create report
 *     tags: [Report]
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - incidentName
 *                - description
 *              properties:
 *               incidentName:
 *                   type: string
 *                   description: Title about the report.
 *                   example: Basura tirada en casa 401
 *               description:
 *                   type: string
 *                   description: Details about the report.
 *                   example: Basura regada en casa 401
 *               incidentEvidence:
 *                   type: Integer
 *                   description: Photo about the incident reported. Is optional.
 *                   example: base64...
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
 *                  example: {"errors":[{"field":"description","message":{"requiredType":"string","warnings":"The field does not exist, is not a string or is empty."}}]}
 */
router.post(
    '/create',
    createIncidentValidationRules(),
    validateJWT,
    validateRole(1,2),
    validateFields,
    createIncident
);

/**
 * @swagger
 * /api/incident/update:
 *   put:
 *     summary: Update report
 *     tags: [Report]
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - incidentName
 *                - description
 *              properties:
 *               incidentName:
 *                   type: string
 *                   description: Title about the report.
 *                   example: Basura tirada en casa 401
 *               description:
 *                   type: string
 *                   description: Details about the report.
 *                   example: Basura regada en casa 401
 *               incidentEvidence:
 *                   type: Integer
 *                   description: Photo about the incident reported. Is optional.
 *                   example: base64...
 *                  
 *     responses:
 *       200:
 *         description:  
 *         content:
 *           application/json:
 *             example:
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
 *                  example: {"errors":[{"field":"description","message":{"requiredType":"string","warnings":"The field does not exist, is not a string or is empty."}}]}
 */
router.put(
    '/update',
    updateIncidentValidationRules(),
    validateJWT,
    validateRole(1,2),
    validateFields,
    updateIncident
);

/**
 * @swagger
 * /api/incident/{id}:
 *   delete:
 *     summary: Delete report by Id
 *     tags: [Report]
 *     parameters:
 *     - name: id
 *       in: path
 *       description: Report ID.
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
 *                  example: {"errors":[{"field":"Id","message":{"requiredType":"string","warnings":"The field does not exist, is not a string or is empty."}}]}
 */
router.delete(
    '/delete/:incidentId',
    getIncidentValidationRules(),
    validateJWT,
    validateRole(1,2),
    validateFields,
    deleteIncident
);

/**
 * @swagger
 * /api/incident/incidents:
 *   post:
 *     summary: Get reports paginated
 *     tags: [Report]
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
 *               data: [{"id":3,"incidentName":"test","description":"test","incidentEvidence":"test 3"},{"id":1,"incidentName":"test","description":"test","incidentEvidence":null}]
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
    '/incidents',
    getIncidentsValidationRules(),
    validateJWT,
    validateRole(1,2),
    validateFields,
    getIncidents
);

export default router;