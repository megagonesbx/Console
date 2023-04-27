import { Router } from "express";

import { createIncident, getIncident, updateIncident, deleteIncident, getIncidents } from '../controllers';

import { createIncidentValidationRules, getIncidentValidationRules, getIncidentsValidationRules, updateIncidentValidationRules } from "../validators";
import { validateRole, validateFields, validateJWT } from "../middlewares";

const router = Router();

// TODO: CREATE MIDDLEWARE TO VALIDATE IF ROLE IS ADMIN OR OPERATOR
router.get(
    '/:incidentId',
    getIncidentValidationRules(),
    validateJWT,
    validateRole(1,2),
    validateFields,
    getIncident
);

router.post(
    '/create',
    createIncidentValidationRules(),
    validateJWT,
    validateRole(1,2),
    validateFields,
    createIncident
);

router.put(
    '/update',
    updateIncidentValidationRules(),
    validateJWT,
    validateRole(1,2),
    validateFields,
    updateIncident
);

router.delete(
    '/delete/:incidentId',
    getIncidentValidationRules(),
    validateJWT,
    validateRole(1,2),
    validateFields,
    deleteIncident
);

router.post(
    '/incidents',
    getIncidentsValidationRules(),
    validateJWT,
    validateRole(1,2),
    validateFields,
    getIncidents
);

export default router;