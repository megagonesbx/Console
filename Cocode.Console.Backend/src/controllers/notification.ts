import { Request, Response } from "express";
import { NotificationService } from "../services";
import { getCurrentDate } from "../helpers";

export const sendNotification = async (_req: Request, _res: Response) => {
  try {
    const { email } = _req.body;
    const date = getCurrentDate();

    const notificationService: NotificationService =
      _req.app.locals.notificationService;

    const id = await notificationService.insertRecord({
      message: `Le recordamos que su pago mensual de residencia correspondiente a ${date} aún no ha sido recibido. Por favor, realice el pago lo antes posible para evitar cargos adicionales y posibles suspensiones de servicio.`,
      user: email,
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
