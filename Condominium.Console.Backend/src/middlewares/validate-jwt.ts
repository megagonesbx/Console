import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken';
import { SECRETKEY, TOKEN } from '../config';

import { PARAM_LOCATION } from "../typings";

interface IJwt {
    uid: string;
    iat: number;
    exp: number;
};

export const validateJWT = async (_req: Request, res: Response, next: NextFunction) => {

    const token = _req.header("x-token");

    if (!token) {
        const message = {
            errors: [
                {
                    field: TOKEN,
                    message: {
                        location: PARAM_LOCATION.HEADER,
                        warnings: "Token unexpected."
                    }
                }
            ]
        };

        return res.status(403).send(message);
    }

    try {
        const { uid } = verify(token, SECRETKEY) as IJwt;

        _req.uid = uid;

        return next();

    } catch (error) {
        return res.status(400).json({
            statusCode: 400,
            message: "Error validating token"
        });
    }
};