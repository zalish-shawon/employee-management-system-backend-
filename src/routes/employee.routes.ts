import { Router } from 'express';
import * as empCtrl from '../controllers/employee.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { createEmployeeSchema } from '../validators/employee.validator';

const router = Router();
router.get('/allEmployees', authenticate, authorize(['admin','hr','manager']), empCtrl.listEmployees);
router.post('/create-employee', authenticate, authorize(['admin','hr']), validate(createEmployeeSchema), empCtrl.createEmployee);
router.put('/update/:id', authenticate, authorize(['admin','hr']), validate(createEmployeeSchema), empCtrl.updateEmployee);
router.delete('/:id', authenticate, authorize(['admin','hr']), empCtrl.deleteEmployee);
router.get('/:id', authenticate, authorize(['admin','hr']), empCtrl.getEmployee);

export default router;
