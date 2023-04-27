import { NextFunction, Request, Response } from "express";
import { UserService } from '../services';

export const validateAdminRole = async (_req: Request, _res: Response, next: NextFunction) => {

    try {
        
        const userService: UserService = _req.app.locals.userService;
        const user = await userService.getRecord(parseInt(_req.uid));

        if (!user) {
            return _res.status(400).json({
                message: "[ERROR][ROLE] User not find",
                statusCode: 400
            });
        };
 
        if (user.Role !== 1) {
            return _res.status(401).json({
                message: "[ERROR][ROLE] Forbidden",
                statusCode: 401
            });
        };

        return next();

    } catch (error) {
        return _res.status(500).json({
            message: "[ERROR][ROLE] An exception was ocurred while validate role",
            statusCode: 500
        });
    };

};

export const validateOperatorRole = async (_req: Request, _res: Response, next: NextFunction) => {

    try {
        
        const userService: UserService = _req.app.locals.userService;
        const user = await userService.getRecord(parseInt(_req.uid));

        if (!user) {
            return _res.status(400).json({
                message: "[ERROR][ROLE] User not find",
                statusCode: 400
            });
        };
 
        if (user.Role != 1 && user.Role != 2) {
            return _res.status(401).json({
                message: "[ERROR][ROLE] Forbidden",
                statusCode: 401
            });
        };

        return next();

    } catch (error) {
        return _res.status(500).json({
            message: "[ERROR][ROLE] An exception was ocurred while validate role",
            statusCode: 500
        });
    };

};

export const validateResidentRole = async (_req: Request, _res: Response, next: NextFunction) => {

    try {
        
        const userService: UserService = _req.app.locals.userService;
        const user = await userService.getRecord(parseInt(_req.uid));

        if (!user) {
            return _res.status(400).json({
                message: "[ERROR][ROLE] User not find",
                statusCode: 400
            });
        };
 
        if (user.Role !== 3) {
            return _res.status(401).json({
                message: "[ERROR][ROLE] Forbidden",
                statusCode: 401
            });
        };

        return next();

    } catch (error) {
        return _res.status(500).json({
            message: "[ERROR][ROLE] An exception was ocurred while validate role",
            statusCode: 500
        });
    };

};