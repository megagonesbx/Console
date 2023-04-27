import { Router } from "express";

import { getDonation, createDonation, updateDonation, deleteDonation, getDonations } from '../controllers';
import { createDonationValidationRules, getDonationValidationRules, getDonationsValidationRules, updateDonationValidationRules } from "../validators";
import { validateRole, validateFields, validateJWT } from "../middlewares";

const router = Router();

/**
 * @swagger
 * /api/donation/{id}:
 *   get:
 *     summary: Get donation by Id
 *     tags: [Donation]
 *     parameters:
 *     - name: id
 *       in: path
 *       description: Donation ID.
 *       required: true
 *       schema:
 *        type: string
 *     responses:
 *       200:
 *         description:  
 *         content:
 *           application/json:
 *             example:
 *               donation:
 *                  id: 1
 *                  quantity: 50
 *                  donationPhoto: base64...
 *                  description: Arroz
 *                  utilization: Donación de demostración para Swagger
 *               statusCode: 200
 *       404:
 *         description: Donation not found
 *       422:
 *         description: Fields Error
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errors:
 *                  type: object
 *                  example: {"errors":[{"field":"quantity","message":{"requiredType":"integer","warnings":"The field does not exist or is must be greather than 0."}}]}
 */
router.get(
    '/:donationId',
    getDonationValidationRules(),
    validateJWT,
    validateRole(1),
    validateFields,
    getDonation
);

/**
 * @swagger
 * /api/donation/create:
 *   post:
 *     summary: Create donation
 *     tags: [Donation]
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - quantity
 *                - description
 *                - utilization
 *              properties:
 *               quantity:
 *                   type: integer
 *                   description: Quantity of the product donated.
 *                   example: 50
 *               donationPhoto:
 *                   type: string
 *                   description: Donation image in format of base64 encoding.
 *                   example: base64...
 *               utilization:
 *                   type: string
 *                   description: Describe about the utilization of the donation.
 *                   example: Swagger documentation
 *               description:
 *                   type: string
 *                   description: Description of the donation.
 *                   example: Rice
 *                  
 *     responses:
 *       200:
 *         description:  
 *         content:
 *           application/json:
 *             example:
 *               donation:
 *                  id: 2
 *                  quantity: 50
 *                  donationPhoto: base64...
 *                  description: Arroz
 *                  utilization: Donación de demostración para Swagger
 *               statusCode: 200
 *       404:
 *         description: Donation not found
 *       422:
 *         description: Fields Error
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errors:
 *                  type: object
 *                  example: {"errors":[{"field":"quantity","message":{"requiredType":"integer","warnings":"The field does not exist or is must be greather than 0."}}]}
 */
router.post(
    '/create',
    createDonationValidationRules(),
    validateJWT,
    validateRole(1),
    validateFields,
    createDonation
);

/**
 * @swagger
 * /api/donation/update:
 *   put:
 *     summary: Update donation
 *     tags: [Donation]
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - quantity
 *                - description
 *                - utilization
 *              properties:
 *               quantity:
 *                   type: integer
 *                   description: Quantity of the product donated.
 *                   example: 50
 *               donationPhoto:
 *                   type: string
 *                   description: Donation image in format of base64 encoding.
 *                   example: base64...
 *               utilization:
 *                   type: string
 *                   description: Describe about the utilization of the donation.
 *                   example: Swagger documentation
 *               description:
 *                   type: string
 *                   description: Description of the donation.
 *                   example: Rice
 *                  
 *     responses:
 *       200:
 *         description:  
 *         content:
 *           application/json:
 *             example:
 *               donation:
 *                  id: 2
 *                  quantity: 25
 *                  donationPhoto: base64...
 *                  description: Arroz precocido
 *                  utilization: Donación de demostración para Swagger
 *               statusCode: 200
 *       404:
 *         description: Donation not found
 *       422:
 *         description: Fields Error
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errors:
 *                  type: object
 *                  example: {"errors":[{"field":"quantity","message":{"requiredType":"integer","warnings":"The field does not exist or is must be greather than 0."}}]}
 */
router.put(
    '/update',
    updateDonationValidationRules(),
    validateJWT,
    validateRole(1),
    validateFields,
    updateDonation
);

/**
 * @swagger
 * /api/donation/{id}:
 *   delete:
 *     summary: Delete donation by Id
 *     tags: [Donation]
 *     parameters:
 *     - name: id
 *       in: path
 *       description: Donation ID.
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
 *         description: Donation not found
 *       422:
 *         description: Fields Error
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errors:
 *                  type: object
 *                  example: {"errors":[{"field":"page","message":{"requiredType":"integer","warnings":"The field does not exist or is must be greather than 0."}}]}
 */
router.delete(
    '/:donationId',
    getDonationValidationRules(),
    validateJWT,
    validateRole(1),
    validateFields,
    deleteDonation
);

/**
 * @swagger
 * /api/donation/donations:
 *   post:
 *     summary: Get donations paginated
 *     tags: [Donation]
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - dpi
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
 *               data: [{"id":1,"quantity":50,"donationPhoto":"base64...","description":"Arroz","utilization":"Donación de demostración para Swagger"}]
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
 *                  example: {"errors":[{"field":"page","message":{"requiredType":"integer","warnings":"The field does not exist or is must be greather than 0."}}]}
 */
router.post(
    '/donations',
    getDonationsValidationRules(),
    validateJWT,
    validateRole(1),
    validateFields,
    getDonations
);

export default router;