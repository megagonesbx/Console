import { Router } from "express";
import { deleteNotification, getNotifications, sendNotification, updateNotification } from "../controllers";
import { createNotificationValidationRules, getNotificationsValidationRules, notificationValidationRules } from "../validators";
import { validateAdminRole, validateFields, validateJWT } from "../middlewares";

const router = Router();

router.post(
    '/create',
    createNotificationValidationRules(),
    validateJWT,
    validateAdminRole,
    validateFields,
    sendNotification
);

// TODO: CREATE MIDDLEWARE TO VALIDATE RESIDENT ROLE
router.get(
    '/:email',
    getNotificationsValidationRules(),
    validateJWT,
    validateFields,
    getNotifications
);

router.put(
    '/viewed/:notificationId',
    notificationValidationRules(),
    validateJWT,
    validateFields,
    updateNotification);

router.delete(
    '/delete/:notificationId', 
    notificationValidationRules(),
    validateJWT,
    validateFields,
    deleteNotification
);

export default router;