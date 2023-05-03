import { Request, Response } from 'express';
import { PaymentService } from '../services';

export const savePayment = async (_req: Request, _res: Response) => {
    try {
        const { ownerDPI, amount, month, description, photo } = _req.body;

        const paymentService: PaymentService = _req.app.locals.paymentService;
        const id = await paymentService.insertRecord({
            ownerDPI,
            amount,
            month,
            description,
            photo
        });

        return _res.json({
            id,
            statusCode: 200
        });

    } catch (error) {
        return _res.json({
            statusCode: 500
        });
    };
};

export const getPayments = async (_req: Request, _res: Response) => {
    try {
        const { dpi, pageSize = 10, page = 1 } = _req.body;

        const paymentService: PaymentService = _req.app.locals.paymentService;
        const { data, totalItems, currentPage, totalPages } = await paymentService.getRecords(page, pageSize, dpi);

        return _res.json({
            data,
            totalItems,
            currentPage,
            totalPages,
            statusCode: 200
        });

    } catch (error) {
        return _res.json({
            statusCode: 500
        });
    };
};