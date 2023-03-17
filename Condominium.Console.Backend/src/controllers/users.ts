import { Request, Response } from "express";
import { genSaltSync, hashSync } from "bcrypt";
import { UserService } from '../services/user.service';

export const createUser = async (_req: Request, _res: Response) => {

    try {
        const { firstName, lastName, email, password } = _req.body;

        const salt = genSaltSync();
        const hashedPassword = await hashSync(password, salt);
        const userService: UserService = _req.app.locals.userService;

        await userService.insertRecord({
            DisplayName: `${firstName} ${lastName}`,
            Email: email,
            Password: hashedPassword,
            Role: 1
        });

        return _res.sendStatus(200)
    } catch (error) {
        return _res.sendStatus(400);
    }


};

// export const login = async (_req: Request, _res: Response) => {
//     _res.send("LOGIN");
// };