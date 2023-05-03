import { Router } from 'express';
import { getPayments, savePayment } from '../controllers';
import { createPaymentValidationRules } from '../validators';
import { validateFields, validateJWT, validateRole } from '../middlewares';

const router = Router();

router.post(
    '/create', 
    createPaymentValidationRules(),
    validateJWT,
    validateRole(3),
    validateFields,
    savePayment    
);

router.post(
    '/payments',
    createPaymentValidationRules(),
    validateJWT,
    validateRole(3),
    validateFields,
    getPayments    
);


export default router;