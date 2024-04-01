import { Request, Response } from "express";
import { NotificationService } from "../services";

export const sendNotification = async (_req: Request, _res: Response) => {
  try {
    const { email } = _req.body;

    const notificationService: NotificationService =
      _req.app.locals.notificationService;

    const id = await notificationService.insertRecord({
      message: `Le solicitamos ponerse al corriente con los pagos pendientes.`,
      user: email,
      type: 1,
    });

    return _res.status(200).json({
      id,
      statusCode: 200,
    });
  } catch (error) {
    return _res.status(400).json({
      statusCode: 400,
    });
  }
};

export const getNotifications = async (_req: Request, _res: Response) => {
  try {
    const { email } = _req.params;

    const notificationService: NotificationService =
      _req.app.locals.notificationService;
    const notifications = await notificationService.getRecords(email);

    return _res.status(200).json({
      statusCode: 200,
      notifications,
    });
  } catch (error) {
    return _res.status(400).json({
      statusCode: 400,
    });
  }
};

export const updateNotification = async (_req: Request, _res: Response) => {
  try {
    const { notificationId } = _req.params;

    const notificationService: NotificationService =
      _req.app.locals.notificationService;
    const updated = await notificationService.setViewed(
      parseInt(notificationId)
    );

    if (!updated) {
      return _res.status(400).json({
        statusCode: 400,
      });
    }

    return _res.status(200).json({
      statusCode: 200,
    });
  } catch (error) {
    return _res.status(500).json({
      statusCode: 500,
    });
  }
};

export const deleteNotification = async (_req: Request, _res: Response) => {
  try {
    const { notificationId } = _req.params;

    const notificationService: NotificationService =
      _req.app.locals.notificationService;
    const updated = await notificationService.setDeleted(
      parseInt(notificationId)
    );

    if (!updated) {
      return _res.status(400).json({
        statusCode: 400,
      });
    }

    return _res.status(200).json({
      statusCode: 200,
    });
  } catch (error) {
    return _res.status(500).json({
      statusCode: 500,
    });
  }
};
