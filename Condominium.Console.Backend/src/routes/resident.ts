import { Router } from "express";

import { getResident, getResidents, createResident, updateResident, deleteResident } from "../controllers/resident";
import { validateAdminRole, validateFields, validateJWT } from '../middlewares';
import { createHouseValidationRules, getHouseValidationRules, getHousesValidationRules, updateHouseValidationRules } from "../validators";

const router = Router();

router.get(
    '/:houseId',
    getHouseValidationRules(),
    validateJWT,
    validateAdminRole,
    validateFields,
    getResident
);

router.post(
    '/create',
    createHouseValidationRules(),
    validateJWT,
    validateAdminRole,
    validateFields,
    createResident
);

router.put(
    '/update',
    updateHouseValidationRules(),
    validateJWT,
    validateAdminRole,
    validateFields,
    updateResident
);

router.delete(
    '/:houseId',
    getHouseValidationRules(),
    validateJWT,
    validateAdminRole,
    validateFields,
    deleteResident
);

router.post(
    '/residents',
    getHousesValidationRules(),
    validateJWT,
    validateAdminRole,
    validateFields,
    getResidents
);

export default router;