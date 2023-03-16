import { Router } from "express";

import { register, login } from '../controllers';

import { validateFields } from '../middlewares/validate-fields';
import { loginValidatonRules } from "../validators/auth";

const router = Router();

router.post(
    '/register',
    register
);

router.post(
    '/login',
    loginValidatonRules(),
    validateFields,
    login
);

export default router;