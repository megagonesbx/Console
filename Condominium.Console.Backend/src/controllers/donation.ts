import { Request, Response } from "express";
import { DonationService } from "../services";

export const createDonation = async (_req: Request, _res: Response) => {
    try {
        const { quantity, donationPhoto, description, utilization } = _req.body;

        const donationService: DonationService = _req.app.locals.donationService;

        const id = await donationService.insertRecord({ 
            quantity, 
            donationPhoto, 
            description, 
            utilization
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

export const getDonation = async (_req: Request, _res: Response) => {
    try {
        const { donationId } = _req.params;
        const donationService: DonationService = _req.app.locals.donationService;

        const donationDB = await donationService.getRecord(parseInt(donationId));

        if (!donationDB) {
            return _res.status(404).json({
                statusCode: 404
            });
        }

        return _res.status(200).json({
            house: donationDB,
            statusCode: 200
        });

    } catch (error) {
        return _res.status(400).json({
            statusCode: 400
        });
    }
};

export const updateDonation = async (_req: Request, _res: Response) => {

    const { id, quantity, donationPhoto, description, utilization } = _req.body;

    try {
        const donationService: DonationService = _req.app.locals.donationService;
        const donationDB = await donationService.getRecord(id);

        if (!donationDB) {
            return _res.status(404).json({
                statusCode: 404
            });
        };

        donationDB.quantity = quantity;
        donationDB.donationPhoto = donationPhoto;
        donationDB.description = description;
        donationDB.utilization = utilization;

        const updated = await donationService.updateRecord(id, donationDB);

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

export const deleteDonation = async (_req: Request, _res: Response) => {
    try {
        const { donationId } = _req.params;
        const donationService: DonationService = _req.app.locals.donationService;

        const donationDB = await donationService.deleteRecord(parseInt(donationId))

        if (!donationDB) {
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
    }
};

export const getDonations = async (_req: Request, _res: Response) => {

    try {
        const { pageSize = 10, page = 1 } = _req.body;
        const donationService: DonationService = _req.app.locals.donationService;

        const { data, totalItems, currentPage, totalPages } = await donationService.getRecords(page, pageSize);

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