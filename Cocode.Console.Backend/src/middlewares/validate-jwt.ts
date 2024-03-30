import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { SECRETKEY, TOKEN } from "../config";
import { UserService } from "../services";

import { PARAM_LOCATION } from "../typings";

interface IJwt {
  uid: string;
  iat: number;
  exp: number;
}

export const validateJWT = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = _req.header("x-token");

  console.log("--------------->", token);
  if (!token) {
    const message = {
      errors: [
        {
          field: TOKEN,
          message: {
            location: PARAM_LOCATION.HEADER,
            warnings: "Token unexpected.",
          },
        },
      ],
    };

    return res.status(403).send(message);
  }

  try {
    const { uid } = (await verify(token, SECRETKEY)) as IJwt;

    const userService: UserService = _req.app.locals.userService;
    const user = await userService.getRecord(parseInt(uid));

    if (!user) {
      return res.status(400).json({
        message: "[ERROR][ROLE] User not find",
        statusCode: 400,
      });
    }

    _req.uid = uid;
    _req.user = user;
    _req.role = user.Role;

    return next();
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: "Error validating token",
    });
  }
};
