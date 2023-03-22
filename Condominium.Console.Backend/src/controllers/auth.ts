import { Request, Response } from "express";
import { compareSync } from "bcrypt";
import { AuthService } from '../services';

export const login = async (_req: Request, _res: Response) => {
    
    const { email, password } = _req.body;

    try {
        const authService: AuthService = _req.app.locals.authService;
        const userPassword = await authService.getRecord(email);

        if (!userPassword) {
            return _res.status(404).json({
                statusCode: 404
            });
        }

        const validPassword = compareSync(password, userPassword!);

        if (!validPassword) {
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