import { Router } from 'express';
import { getPayments, savePayment } from '../controllers';

const router = Router();

router.post('/create', savePayment);
router.post('/payments', getPayments);


export default router;