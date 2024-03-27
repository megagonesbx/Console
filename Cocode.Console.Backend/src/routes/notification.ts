import { Router } from "express";
import {
  deleteNotification,
  getNotifications,
  sendNotification,
  updateNotification,
} from "../controllers";
import {
  createNotificationValidationRules,
  notificationValidationRules,
  getNotificationsValidationRules,
} from "../validators";
import { validateRole, validateFields, validateJWT } from "../middlewares";

const router = Router();

/**
 * @swagger
 * /api/notification/create:
 *   post:
 *     summary: Send notification to resident
 *     tags: [Notification]
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - email
 *              properties:
 *               email:
 *                   type: string
 *                   description: Resident email to send notification.
 *                   example: swagger@cocode.com
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
 *                  example: {"errors":[{"field":"email","message":{"requiredType":"string","warnings":"The field does not exist, is not a string or is empty."}}]}
 */
router.post(
  "/create",
  createNotificationValidationRules(),
  validateJWT,
  validateRole(1),
  validateFields,
  sendNotification
);

/**
 * @swagger
 * /api/notification/{email}:
 *   get:
 *     summary: Get notifications by resident
 *     tags: [Notification]
 *     parameters:
 *     - name: email
 *       in: path
 *       description: Resident email
 *       required: true
 *       schema:
 *        type: string
 *     responses:
 *       200:
 *         description:
 *         content:
 *           application/json:
 *             example::
 *               notifications: [{"message":"Le recordamos que su pago mensual de residencia correspondiente a Abril 2023 aún no ha sido recibido. Por favor, realice el pago lo antes posible para evitar cargos adicionales y posibles suspensiones de servicio.","viewed":false,"createdAt":"2023-04-23T22:14:22.756Z"}]
 *               statusCode: 200
 *       404:
 *         description: Resident not found
 *       422:
 *         description: Fields Error
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errors:
 *                  type: object
 *                  example: {"errors":[{"field":"email","message":{"requiredType":"string","warnings":"The email doesn't exist in the queryparam, is not a valid email or is empty."}}]}
 */
router.get(
  "/:email",
  getNotificationsValidationRules(),
  validateJWT,
  validateRole(3),
  validateFields,
  getNotifications
);

/**
 * @swagger
 * /api/notification/{id}:
 *   put:
 *     summary: Set notification as viewed by Id
 *     tags: [Notification]
 *     parameters:
 *     - name: id
 *       in: path
 *       description: Notification ID.
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
 *                  example: {"errors":[{"field":"ID","message":{"requiredType":"string","warnings":"The ID doesn't exist in the queryparam, is not a integer or is empty."}}]}
 */
router.put(
  "/viewed/:notificationId",
  notificationValidationRules(),
  validateJWT,
  validateRole(3),
  validateFields,
  updateNotification
);

/**
 * @swagger
 * /api/notification/{id}:
 *   delete:
 *     summary: Delete notification by Id
 *     tags: [Notification]
 *     parameters:
 *     - name: id
 *       in: path
 *       description: Notification ID.
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
 *                  example: {"errors":[{"field":"ID","message":{"requiredType":"string","warnings":"The ID doesn't exist in the queryparam, is not a integer or is empty."}}]}
 */
router.delete(
  "/delete/:notificationId",
  notificationValidationRules(),
  validateJWT,
  validateRole(3),
  validateFields,
  deleteNotification
);

export default router;
