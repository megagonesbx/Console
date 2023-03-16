import { Request, Response } from "express";

export const register = async (_req: Request, _res: Response) => {
    _res.send("REGISTER");
};

export const login = async (_req: Request, _res: Response) => {
    _res.send("LOGIN");
};