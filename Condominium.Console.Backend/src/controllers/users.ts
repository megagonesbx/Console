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
        const userDB = await userService.getRecordById(parseInt(userId));

        if (!userDB) {
            return _res.status(404).json({
                statusCode: 404
            });
        }

        const { Password, ...user } = userDB;

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

export const updateUser = async (_req: Request, _res: Response) => {

    const { id, firstName, lastName, password } = _req.body;
    try {

        const userService: UserService = _req.app.locals.userService;
        const userDB = await userService.getRecordById(id);

        if (!userDB) {
            return _res.status(404).json({
                statusCode: 404
            });
        }

        if (password) {
            const salt = genSaltSync();
            const saltedCurrentPassword = hashSync(password, salt);

            userDB.Password = saltedCurrentPassword;
        }

        userDB.DisplayName = `${firstName} ${lastName}`;
        
        const updated = await userService.updateRecord(id, userDB);

        if (!updated) {
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