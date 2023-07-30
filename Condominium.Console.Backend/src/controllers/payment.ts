import { Request, Response } from 'express';
import { PaymentService, ResidentService } from '../services';
import { validatePayment } from '../helpers/payment';

export const savePayment = async (_req: Request, _res: Response) => {
    try {
        const { ownerDPI, amount, month, description, photo, homeAddress } = _req.body;

        const paymentService: PaymentService = _req.app.locals.paymentService;
        const residentService: ResidentService = _req.app.locals.residentService;

        const isValidPayment = await validatePayment(paymentService, ownerDPI, month, homeAddress);

        if (!isValidPayment) {
            return _res.status(403).json({
                statusCode: 403
            });
        }

        const id = await paymentService.insertRecord({
            ownerDPI,
            amount,
            month,
            description,
            photo,
            homeAddress
        });

        const currentMonth: number = new Date().getMonth() + 1;
        if (currentMonth == month) {
            const houseId: any = await residentService.getRecordGeneric(ownerDPI, homeAddress, ["id"]);
            const solvent = await residentService.setSolventResident(parseInt(houseId.id));

            if (!solvent) return _res.json({
                statusCode: 400
            });
        };

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
            count: totalItems,
            page: currentPage,
            pages: totalPages,
            statusCode: 200
        });

    } catch (error) {
        return _res.json({
            statusCode: 500
        });
    };
};