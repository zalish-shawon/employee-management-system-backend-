import { Request, Response, NextFunction } from 'express';
import * as employeeService from '../services/employee.service';
import { buildPagination } from '../utils/paginator';

export async function createEmployee(req: Request, res: Response, next: NextFunction) {
  try {
    const doc = await employeeService.createEmployee(req.body);
    res.status(201).json(doc);
  } catch (err) { next(err); }
}

export async function listEmployees(req: Request, res: Response, next: NextFunction) {
  try {
    const page = buildPagination(req.query);
    const result = await employeeService.listEmployees(page);
    res.json(result);
  } catch (err) { next(err); }
}

export async function getEmployee(req: Request, res: Response, next: NextFunction) {
  try {
    const doc = await employeeService.getEmployeeById(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json(doc);
  } catch (err) { next(err); }
}
