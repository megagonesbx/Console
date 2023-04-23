import { Router } from "express";
import { deleteNotification, getNotifications, sendNotification, updateNotification } from "../controllers";

const router = Router();

router.post(
    '/create',
    sendNotification
);

router.get('/', getNotifications);

router.put('/viewed/:notificationId', updateNotification);

router.delete('/delete/:notificationId', deleteNotification);

export default router;