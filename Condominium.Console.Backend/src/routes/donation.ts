import { Router } from "express";

import { getDonation, createDonation, updateDonation, deleteDonation, getDonations } from '../controllers';

const router = Router();

router.get(
    '/:donationId',
    getDonation
);

router.post(
    '/create',
    createDonation
);

router.put(
    '/update',
    updateDonation
);

router.delete(
    '/:houseId',
    deleteDonation
);

router.post(
    '/residents',
    getDonations
);

export default router;