import { Request, Response } from "express";
import { PaymentService } from "../services";
import { validatePayment } from "../helpers/payment";

export const savePayment = async (_req: Request, _res: Response) => {
  try {
    const { userId, amount, month, description, photo } = _req.body;

    const paymentService: PaymentService = _req.app.locals.paymentService;

    const isValidPayment = await validatePayment(paymentService, userId, month);

    if (!isValidPayment) {
      return _res.status(403).json({
        statusCode: 403,
      });
    }

    const id = await paymentService.insertRecord({
      month,
      photo,
      userId,
      amount,
      description,
    });

    return _res.json({
      id,
      statusCode: 200,
    });
  } catch (error) {
    return _res.json({
      statusCode: 500,
    });
  }
};

export const getPayments = async (_req: Request, _res: Response) => {
  try {
    const { dpi, pageSize = 10, page = 1 } = _req.body;

    const paymentService: PaymentService = _req.app.locals.paymentService;
    const { data, totalItems, currentPage, totalPages } =
      await paymentService.getRecords(page, pageSize, dpi);

    return _res.json({
      data,
      count: totalItems,
      page: currentPage,
      pages: totalPages,
      statusCode: 200,
    });
  } catch (error) {
    return _res.json({
      statusCode: 500,
    });
  }
};
