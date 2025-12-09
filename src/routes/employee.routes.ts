import { Router } from 'express';
import * as empCtrl from '../controllers/employee.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { createEmployeeSchema } from '../validators/employee.validator';

const router = Router();
router.get('/', authenticate, authorize(['admin','hr','manager']), empCtrl.listEmployees);
router.post('/', authenticate, authorize(['admin','hr']), validate(createEmployeeSchema), empCtrl.createEmployee);
router.get('/:id', authenticate, authorize(['admin','hr','manager','employee']), empCtrl.getEmployee);
export default router;
