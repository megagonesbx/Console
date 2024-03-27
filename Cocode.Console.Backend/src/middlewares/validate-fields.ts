import { NextFunction, Request, Response } from "express";

import { validationResult } from "express-validator";
import { FieldValidationError } from "../typings";

export const validateFields = async (_req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(_req);
    if (errors.isEmpty()) return next();

    const uniqueErrors: FieldValidationError[] = [];
    errors.array().forEach((error) => {
        if (!uniqueErrors.some((uniqueError) => uniqueError.field === error.param)) {
            uniqueErrors.push({
                field: error.param,
                message: error.msg
            })
        }
    });

    return res.status(422).json({ errors: uniqueErrors });
}