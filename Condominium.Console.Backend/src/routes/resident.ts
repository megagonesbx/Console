import { Router } from "express";

import { getResident, getResidents, createResident, updateResident, deleteResident } from "../controllers/resident";
// import { validateFields, validateJWT } from '../middlewares';

const router = Router();

router.get(
    '/:houseId',
    getResident
);

router.post(
    '/create',
    createResident
);

router.put(
    '/update',
    updateResident
);

router.delete(
    '/:houseId',
    deleteResident
);

router.post(
    '/residents',
    getResidents
);

export default router;