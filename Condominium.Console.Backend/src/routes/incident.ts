import { Router } from "express";

import { createIncident, getIncident, updateIncident, deleteIncident, getIncidents } from '../controllers';

const router = Router();

router.get(
    '/:incidentId',
    getIncident
);

router.post(
    '/create',
    createIncident
);

router.put(
    '/update',
    updateIncident
);

router.delete(
    '/:incidentId',
    deleteIncident
);

router.post(
    '/incidents',
    getIncidents
);

export default router;