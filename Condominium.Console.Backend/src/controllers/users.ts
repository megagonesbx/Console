import { Request, Response } from "express";
import { genSaltSync, hashSync } from "bcrypt";
import { UserService } from '../services';

export const createUser = async (_req: Request, _res: Response) => {

    try {
        const { firstName, lastName, email, password, role } = _req.body;

        const salt = genSaltSync();
        const hashedPassword = await hashSync(password, salt);
        const userService: UserService = _req.app.locals.userService;

        const id = await userService.insertRecord({
            DisplayName: `${firstName} ${lastName}`,
            Email: email,
            Password: hashedPassword,
            Role: role
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

export const getUser = async (_req: Request, _res: Response) => {
    try {
        const { userId } = _req.params;
        
        const userService: UserService = _req.app.locals.userService;
        const user = await userService.getRecordById(parseInt(userId));

        if (!user) {
            return _res.status(404).json({
                statusCode: 404
            });
        }

        return _res.status(200).json({
            user,
            statusCode: 200
        });

    } catch (error) {
        return _res.status(400).json({
            statusCode: 400
        });
    }
};