import { Router } from "express";

import { createIncident, getIncident, updateIncident, deleteIncident, getIncidents } from '../controllers';

import { createIncidentValidationRules, getIncidentValidationRules, getIncidentsValidationRules, updateIncidentValidationRules } from "../validators/incident/incident-rules";
import { validateFields, validateJWT } from "../middlewares";

const router = Router();

// TODO: CREATE MIDDLEWARE TO VALIDATE IF ROLE IS ADMIN OR OPERATOR
router.get(
    '/:incidentId',
    getIncidentValidationRules(),
    validateJWT,
    validateFields,
    getIncident
);

router.post(
    '/create',
    createIncidentValidationRules(),
    validateJWT,
    validateFields,
    createIncident
);

router.put(
    '/update',
    updateIncidentValidationRules(),
    validateJWT,
    validateFields,
    updateIncident
);

router.delete(
    '/:incidentId',
    getIncidentValidationRules(),
    validateJWT,
    validateFields,
    deleteIncident
);

router.post(
    '/incidents',
    getIncidentsValidationRules(),
    validateJWT,
    validateFields,
    getIncidents
);

export default router;