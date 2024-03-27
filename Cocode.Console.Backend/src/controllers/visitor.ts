import { Request, Response } from "express";
import { VisitorService } from '../services';

export const createVisitorRecord = async (_req: Request, _res: Response) => {
    try {

        const { name, dpi, homeAddress } = _req.body;

        const visitorService: VisitorService = _req.app.locals.visitorService;

        const id = await visitorService.insertRecord({
            name,
            dpi,
            homeAddress
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

export const getVisitor = async (_req: Request, _res: Response) => {
    try {
        const { visitorId } = _req.params;

        const visitorService: VisitorService = _req.app.locals.visitorService;
        const visitor = await visitorService.getRecord(parseInt(visitorId));
    
        if (!visitor) {
            return _res.status(404).json({
                statusCode: 404
            });
        }
    
        return _res.status(200).json({
            visitor,
            statusCode: 200
        });
    } catch (error) {
        return _res.status(400).json({
            statusCode: 400
        });
    }
};

export const updateVisitor = async (_req: Request, _res: Response) => {

    const { id, name, dpi, homeAddress } = _req.body;

    try {
        const visitorService: VisitorService = _req.app.locals.visitorService;

        const visitorDB = await visitorService.getRecord(id);

        if (!visitorDB) {
            return _res.status(404).json({
                statusCode: 404
            });
        };

        visitorDB.name = name;
        visitorDB.dpi = dpi;
        visitorDB.homeAddress = homeAddress;

        const updated = await visitorService.updateRecord(id, visitorDB);

        if (!updated) {
            return _res.status(400).json({
                statusCode: 400
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

export const deleteVisitor = async (_req: Request, _res: Response) => {
    try {
        const { visitorId } = _req.params;

        const visitorService: VisitorService = _req.app.locals.visitorService;
        const visitor = await visitorService.deleteRecord(parseInt(visitorId));
    
        if (!visitor) {
            return _res.status(404).json({
                statusCode: 404
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

export const getVisitors = async (_req: Request, _res: Response) => {

    try {
        const { pageSize = 10, page = 1 } = _req.body;
        const visitorService: VisitorService = _req.app.locals.visitorService;

        const { data, totalItems, currentPage, totalPages } = await visitorService.getRecords(page, pageSize);

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