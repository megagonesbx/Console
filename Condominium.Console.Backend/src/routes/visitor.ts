import { Router } from "express";
import { createVisitorRecord, deleteVisitor, getVisitor, getVisitors, updateVisitor } from "../controllers";
import { validateFields, validateJWT, validateRole } from "../middlewares";
import { createVisitorValidationRules, getVisitorValidationRules, getVisitorsValidationRules, updateVisitorValidationRules } from "../validators";

const router = Router();

router.get(
    '/:visitorId',
    getVisitorValidationRules(),
    validateJWT,
    validateRole(1,2),
    validateFields,
    getVisitor
);

router.post(
    '/create',
    createVisitorValidationRules(),
    validateJWT,
    validateRole(1,2),
    validateFields,
    createVisitorRecord
);

router.put(
    '/update',
    updateVisitorValidationRules(),
    validateJWT,
    validateRole(1,2),
    validateFields,
    updateVisitor
);

router.delete(
    '/delete/:visitorId',
    getVisitorValidationRules(),
    validateJWT,
    validateRole(1,2),
    validateFields,
    deleteVisitor
);

router.post(
    '/visitors',
    getVisitorsValidationRules(),
    validateJWT,
    validateRole(1,2),
    validateFields,
    getVisitors
)

export default router;