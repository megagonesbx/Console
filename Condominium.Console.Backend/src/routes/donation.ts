import { Router } from "express";

import { getDonation, createDonation, updateDonation, deleteDonation, getDonations } from '../controllers';
import { createDonationValidationRules, getDonationValidationRules, getDonationsValidationRules, updateDonationValidationRules } from "../validators";
import { validateAdminRole, validateFields, validateJWT } from "../middlewares";

const router = Router();

router.get(
    '/:donationId',
    getDonationValidationRules(),
    validateJWT,
    validateAdminRole,
    validateFields,
    getDonation
);

router.post(
    '/create',
    createDonationValidationRules(),
    validateJWT,
    validateAdminRole,
    validateFields,
    createDonation
);

router.put(
    '/update',
    updateDonationValidationRules(),
    validateJWT,
    validateAdminRole,
    validateFields,
    updateDonation
);

router.delete(
    '/:donationId',
    getDonationValidationRules(),
    validateJWT,
    validateAdminRole,
    validateFields,
    deleteDonation
);

router.post(
    '/donations',
    getDonationsValidationRules(),
    validateJWT,
    validateAdminRole,
    validateFields,
    getDonations
);

export default router;