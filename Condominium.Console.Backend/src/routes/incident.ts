import { Router } from "express";

import { createIncident, getIncident, updateIncident, deleteIncident, getIncidents } from '../controllers';

import { createIncidentValidationRules, getIncidentValidationRules, getIncidentsValidationRules, updateIncidentValidationRules } from "../validators";
import { haveRoles, validateFields, validateJWT } from "../middlewares";

const router = Router();

// TODO: CREATE MIDDLEWARE TO VALIDATE IF ROLE IS ADMIN OR OPERATOR
router.get(
    '/:incidentId',
    getIncidentValidationRules(),
    validateJWT,
    haveRoles(1,2),
    validateFields,
    getIncident
);

router.post(
    '/create',
    createIncidentValidationRules(),
    validateJWT,
    haveRoles(1,2),
    validateFields,
    createIncident
);

router.put(
    '/update',
    updateIncidentValidationRules(),
    validateJWT,
    haveRoles(1,2),
    validateFields,
    updateIncident
);

router.delete(
    '/:incidentId',
    getIncidentValidationRules(),
    validateJWT,
    haveRoles(1,2),
    validateFields,
    deleteIncident
);

router.post(
    '/incidents',
    getIncidentsValidationRules(),
    validateJWT,
    haveRoles(1,2),
    validateFields,
    getIncidents
);

export default router;