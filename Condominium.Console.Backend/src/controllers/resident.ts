import { Request, Response } from "express";
import { ResidentService } from "../services";

export const createResident = async (_req: Request, _res: Response) => {
    try {
        const { homeAddress, ownerName, ownerDPI, phoneNumber, solvent } = _req.body;

        const residentService: ResidentService = _req.app.locals.residentService;

        const id = await residentService.insertRecord({
            homeAddress,
            ownerName,
            ownerDPI,
            phoneNumber,
            solvent
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

export const getResident = async (_req: Request, _res: Response) => {
    try {
        const { houseId } = _req.params;
        const residentService: ResidentService = _req.app.locals.residentService;

        const houseDB = await residentService.getRecord(parseInt(houseId), ["id", "homeAddress", "ownerName", "ownerDPI", "phoneNumber", "solvent"])

        if (!houseDB) {
            return _res.status(404).json({
                statusCode: 404
            });
        }

        return _res.status(200).json({
            house: houseDB,
            statusCode: 200
        });

    } catch (error) {
        return _res.status(400).json({
            statusCode: 400
        });
    }
};

export const updateResident = async (_req: Request, _res: Response) => {

    const { id, homeAddress, ownerName, ownerDPI, phoneNumber, solvent } = _req.body;

    try {
        const residentService: ResidentService = _req.app.locals.residentService;
        const houseDB = await residentService.getRecord(id);

        if (!houseDB) {
            return _res.status(404).json({
                statusCode: 404
            });
        };

        houseDB.homeAddress = homeAddress;
        houseDB.ownerName = ownerName;
        houseDB.ownerDPI = ownerDPI;
        houseDB.phoneNumber = phoneNumber;
        houseDB.solvent = solvent;

        const updated = await residentService.updateRecord(id, houseDB);

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

export const deleteResident = async (_req: Request, _res: Response) => {
    try {
        const { houseId } = _req.params;
        const residentService: ResidentService = _req.app.locals.residentService;

        const houseDB = await residentService.deleteRecord(parseInt(houseId))

        if (!houseDB) {
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

export const getResidents = async (_req: Request, _res: Response) => {

    try {
        const { dpi, pageSize = 10, page = 1 } = _req.body;
        const residentService: ResidentService = _req.app.locals.residentService;

        const { data, totalItems, currentPage, totalPages } = await residentService.getRecords(dpi, page, pageSize);

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

export const setSolvent = async (_req: Request, _res: Response) => {
    try {

        const { residentId } = _req.body;

        const residentService: ResidentService = _req.app.locals.residentService;

        const solvent = await residentService.setSolventResident(residentId);

        if (!solvent) {
            return _res.status(400).json({
                statusCode: 400
            });
        }

        return _res.status(200).json({
            statusCode: 200
        });

    } catch (error) {
        return _res.status(500).json({
            statusCode: 500
        });
    };
};

export const restartSolvent = async (_req: Request, _res: Response) => {
    try {

        const residentService: ResidentService = _req.app.locals.residentService;
        const wasUpdated = await residentService.resetSolvent();
        
        if (!wasUpdated) {
            return _res.status(400).json({
                statusCode: 400
            });
        }

        return _res.status(200).json({
            statusCode: 200
        });
    } catch (error) {
        return _res.status(500).json({
            statusCode: 500
        });
    }
};