import { Request, Response } from "express";
import { SpreadsheetService } from "../services";
import { validateSpreadsheet } from "../helpers";
import { SpreadsheetData } from "../database";

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

export const updateSpreadsheet = async (_req: Request, _res: Response) => {
    try {
        const { id, name, dpi, paymentMonth } = _req.body;
        const spreadsheetService: SpreadsheetService = _req.app.locals.spreadsheetService;

        const spreadsheetDB = await spreadsheetService.getRecord(id);

        if (!spreadsheetDB) {
            return _res.status(404).json({
                statusCode: 404
            });
        };

        spreadsheetDB.Name = name;
        spreadsheetDB.DPI = dpi;

        // VALIDATE IF A MONTH IS ALREADY PAID
        if (paymentMonth != spreadsheetDB.PaymentMonth) {

            const isValidPayment = await validateSpreadsheet(spreadsheetService, paymentMonth, dpi);

            if (!isValidPayment) {
                return _res.status(403).json({
                    statusCode: 403
                });
            };

            spreadsheetDB.PaymentMonth = paymentMonth;
        }

        const updated = await spreadsheetService.updateRecord(id, spreadsheetDB);

        if (!updated) {
            return _res.status(400).json({
                statusCode: 400
            });
        }

        return _res.status(200).json({
            statusCode: 200
        });

    } catch (error) {
        return _res.status(400).json({
            statusCode: 400
        });
    }
};

export const getSpreadsheet = async (_req: Request, _res: Response) => {
    try {
        const { spreadsheetId } = _req.params;
        const spreadsheetService: SpreadsheetService = _req.app.locals.spreadsheetService;

        const spreadSheetDB: SpreadsheetData | null = await spreadsheetService.getRecord(parseInt(spreadsheetId));

        if (!spreadSheetDB) {
            return _res.status(404).json({
                statusCode: 404
            });
        };

        return _res.status(200).json({
            spreadsheet: spreadSheetDB,
            statusCode: 200
        });
        
    } catch (error) {
        return _res.status(400).json({
            statusCode: 400
        });
    };
};

export const deleteSpreadsheet = async (_req: Request, _res: Response) => {
    try {
        const { spreadsheetId } = _req.params;
        const spreadsheetService: SpreadsheetService = _req.app.locals.spreadsheetService;

        const isDeleted = await spreadsheetService.deleteRecord(parseInt(spreadsheetId));

        if (!isDeleted) {
            return _res.status(404).json({
                statusCode: 404
            });
        };

        return _res.status(200).json({
            statusCode: 200
        });
        
    } catch (error) {
        return _res.status(400).json({
            statusCode: 400
        });
    };
};

export const getSpreadsheets = async (_req: Request, _res: Response) => {

    try {
        const { dpi, pageSize = 10, page = 1 } = _req.body;
        const spreadsheetService: SpreadsheetService = _req.app.locals.spreadsheetService;

        const { data, totalItems, currentPage, totalPages } = await spreadsheetService.getRecords(page, pageSize, dpi);

        return _res.status(200).json({
            data,
            count: totalItems,
            page: currentPage,
            pages: totalPages,
            statusCode: 200
        }); 
        
    } catch (error) {
        return _res.status(400).json({
            data: [],
            count: 0,
            statusCode: 400
        });
    }

};