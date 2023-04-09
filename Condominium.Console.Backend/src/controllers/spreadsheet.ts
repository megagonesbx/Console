import { Request, Response } from "express";
import { SpreadsheetService } from "../services";

export const createSpreadsheet = async (_req: Request, _res: Response) => {
    try {
        const { name, dpi, paymentMonth } = _req.body;
        const spreadsheetService: SpreadsheetService = _req.app.locals.spreadsheetService;

        const id = await spreadsheetService.insertRecord({
            Name: name,
            DPI: dpi,
            PaymentMonth: paymentMonth
        })

        console.log('CONTROLLER ----------------------->', id)

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