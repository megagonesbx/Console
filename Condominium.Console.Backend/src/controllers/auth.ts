import { Request, Response } from "express";
import { compareSync } from "bcrypt";
import { AuthService } from '../services';
import { generateJWT } from "../helpers";

export const login = async (_req: Request, _res: Response) => {
    
    const { email, password } = _req.body;

    try {
        const authService: AuthService = _req.app.locals.authService;
        const user = await authService.getRecord(email);

        if (!user) {
            return _res.status(404).json({
                statusCode: 404
            });
        }

        const validPassword = compareSync(password, user.Password);
        if (!validPassword) {
            return _res.status(400).json({
                statusCode: 400
            });
        }

        const token = await generateJWT(JSON.stringify(user.id));

        return _res.status(200).json({
            token,
            statusCode: 200
        });
        
    } catch (error) {
        return _res.status(500).json({
            statusCode: 500
        });
    };
};