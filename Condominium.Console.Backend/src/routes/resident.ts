import { Router } from "express";

import { getResident, getResidents, createResident, updateResident, deleteResident, setSolvent, restartSolvent } from "../controllers/resident";
import { validateRole, validateFields, validateJWT } from '../middlewares';
import { createHouseValidationRules, getHouseValidationRules, getHousesValidationRules, updateHouseValidationRules } from "../validators";

const router = Router();

/**
 * @swagger
 * /api/resident/{id}:
 *   get:
 *     summary: Get house by Id
 *     tags: [Resident]
 *     parameters:
 *     - name: id
 *       in: path
 *       description: House ID.
 *       required: true
 *       schema:
 *        type: string
 *     responses:
 *       200:
 *         description:  
 *         content:
 *           application/json:
 *             example:
 *               house:
 *                  id: 1
 *                  homeAddress: Casa 1
 *                  ownerName: Swagger
 *                  ownerDPI: 3639933470703
 *                  phoneNumber: 24106130
 *                  solvent: true
 *               statusCode: 200
 *       404:
 *         description: House not found
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
    '/:houseId',
    getHouseValidationRules(),
    validateJWT,
    validateRole(1),
    validateFields,
    getResident
);

/**
 * @swagger
 * /api/resident/create:
 *   post:
 *     summary: Create house
 *     tags: [Resident]
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - homeAddress
 *                - ownerName
 *                - ownerDPI
 *                - phoneNumber
 *                - solvent
 *              properties:
 *               homeAddress:
 *                   type: string
 *                   description: Home address must be unique.
 *                   example: Casa 1
 *               ownerName:
 *                   type: string
 *                   description: Name of the owner
 *                   example: Smith
 *               phoneNumber:
 *                   type: Integer
 *                   description: Phone number about the owner
 *                   example: 12346789
 *               ownerDPI:
 *                   type: string
 *                   description: DPI number about the owner
 *                   example: 1234567891234
 *               solvent:
 *                   type: boolean
 *                   description: If the house is solvent
 *                   example: false
 *                  
 *     responses:
 *       200:
 *         description:  
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               statusCode: 200
 *       404:
 *         description: House not found
 *       422:
 *         description: Fields Error
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errors:
 *                  type: object
 *                  example: {"errors":[{"field":"ownerDPI","message":{"requiredType":"string","warnings":"The field does not exist, is not a string or is empty."}}]}
 */
router.post(
    '/create',
    createHouseValidationRules(),
    validateJWT,
    validateRole(1),
    validateFields,
    createResident
);

/**
 * @swagger
 * /api/resident/update:
 *   put:
 *     summary: Update house
 *     tags: [Resident]
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - homeAddress
 *                - ownerName
 *                - ownerDPI
 *                - phoneNumber
 *                - solvent
 *              properties:
 *               id:
 *                   type: number
 *                   description: House id to be updated
 *                   example: 1
 *               homeAddress:
 *                   type: string
 *                   description: Home address must be unique.
 *                   example: Casa 1 Updated
 *               ownerName:
 *                   type: string
 *                   description: Name of the owner
 *                   example: Smith
 *               phoneNumber:
 *                   type: Integer
 *                   description: Phone number about the owner
 *                   example: 12346789
 *               ownerDPI:
 *                   type: string
 *                   description: DPI number about the owner
 *                   example: 00001111222333
 *               solvent:
 *                   type: boolean
 *                   description: If the house is solvent
 *                   example: true
 *                  
 *     responses:
 *       200:
 *         description:  
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 200
 *       404:
 *         description: House not found
 *       422:
 *         description: Fields Error
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errors:
 *                  type: object
 *                  example: {"errors":[{"field":"ownerDPI","message":{"requiredType":"string","warnings":"The field does not exist, is not a string or is empty."}}]}
 */
router.put(
    '/update',
    updateHouseValidationRules(),
    validateJWT,
    validateRole(1),
    validateFields,
    updateResident
);

/**
 * @swagger
 * /api/resident/{id}:
 *   delete:
 *     summary: Delete house by Id
 *     tags: [Resident]
 *     parameters:
 *     - name: id
 *       in: path
 *       description: House ID.
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
 *         description: House not found
 *       422:
 *         description: Fields Error
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errors:
 *                  type: object
 *                  example: {"errors":[{"field":"dpi","message":{"requiredType":"string","warnings":"The field does not exist, is not a string or is empty."}}]}
 */
router.delete(
    '/:houseId',
    getHouseValidationRules(),
    validateJWT,
    validateRole(1),
    validateFields,
    deleteResident
);

/**
 * @swagger
 * /api/resident/residents:
 *   post:
 *     summary: Get houses paginated
 *     tags: [Resident]
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - dpi
 *              properties:
 *               dpi:
 *                   type: string
 *                   description: DPI to filter houses, if you want get all houses remove this property.
 *                   example: 1234567891234
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
 *               data: [{"homeAddress":"Casa 1","ownerName":"admin","ownerDPI":"3639933470703","phoneNumber":"24106130","solvent":false}]
 *               count: 10 
 *               page: 1
 *               pages: 3
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
 *                  example: {"errors":[{"field":"dpi","message":{"requiredType":"string","warnings":"The field does not exist, is not a string or is empty."}}]}
 */
router.post(
    '/residents',
    getHousesValidationRules(),
    validateJWT,
    validateRole(1),
    validateFields,
    getResidents
);

/**
 * @swagger
 * /api/resident/reset:
 *   patch:
 *     summary: Reset all residents to solvent in false.
 *     tags: [Resident]
 *     parameters:
 *     - name: id
 *       in: path
 *       description: House ID.
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
 *       422:
 *         description: Fields Error
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errors:
 *                  type: object
 *                  example: {"errors":[{"field":"houseId","message":{"location":"Query param","warnings":"The ID doesn't exist in the queryparam, is not a int or is empty."}}]}
 */
router.patch(
    '/reset',
    validateJWT,
    validateRole(1),
    validateFields,
    restartSolvent
);

/**
 * @swagger
 * /api/resident/solvent/{id}:
 *   patch:
 *     summary: Solvet house by Id
 *     tags: [Resident]
 *     parameters:
 *     - name: id
 *       in: path
 *       description: House ID.
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
 *       422:
 *         description: Fields Error
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errors:
 *                  type: object
 *                  example: {"errors":[{"field":"houseId","message":{"location":"Query param","warnings":"The ID doesn't exist in the queryparam, is not a int or is empty."}}]}
 */
router.patch(
    '/solvent/:houseId',
    getHouseValidationRules(),
    validateJWT,
    validateRole(1),
    validateFields,
    setSolvent
);


export default router;