import { Router } from 'express';
import * as authCtrl from '../controllers/auth.controller';
import { validate } from '../middleware/validate.middleware';
import { registerSchema, loginSchema } from '../validators/auth.validator';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
router.post('/register', validate(registerSchema), authCtrl.register);
router.post('/login', validate(loginSchema), authCtrl.login);
router.post("/logout", authCtrl.logout);
router.get("/me", authMiddleware, authCtrl.meController);
export default router;
