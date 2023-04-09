import { Request, Response } from "express";
import { SpreadsheetService } from "../services";
import { validateSpreadsheet } from "../helpers";

export const createSpreadsheet = async (_req: Request, _res: Response) => {
    try {
        const { name, dpi, paymentMonth } = _req.body;
        const spreadsheetService: SpreadsheetService = _req.app.locals.spreadsheetService;

        const isValidPayment = await validateSpreadsheet(spreadsheetService, paymentMonth, dpi);

        if (!isValidPayment) {
            return _res.status(403).json({
                statusCode: 403
            });
        };

        const id = await spreadsheetService.insertRecord({
            Name: name,
            DPI: dpi,
            PaymentMonth: paymentMonth
        });

        return _res.status(200).json({
            id,
            statusCode: 200
        });

    } catch (error) {
        return _res.status(400).json({
            statusCode: 400
        });
    }
};