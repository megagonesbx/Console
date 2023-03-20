import { Router } from "express";

import { createUser, getUser } from '../controllers';

import { validateFields } from '../middlewares/validate-fields';
import { createUserValidationRules, getUserValidationRules } from "../validators";

const router = Router();

router.get(
    '/:userId',
    getUserValidationRules(),
    validateFields,
    getUser
);

router.post(
    '/create',
    createUserValidationRules(),
    validateFields,
    createUser
);

export default router;