import { Router } from "express";

import { } from '../controllers';

// import { validateFields } from '../middlewares/validate-fields';
import { createUser } from '../controllers';

const router = Router();

router.post(
    '/create',
    createUser
)

export default router;