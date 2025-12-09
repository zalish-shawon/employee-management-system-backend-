import { Request, Response, NextFunction } from 'express';
import * as employeeService from '../services/employee.service';
import { buildPagination } from '../utils/paginator';
import Employee from '../models/Employee';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { config } from '../config';


const uploadDir = config.UPLOAD_DIR;
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
export const upload = multer({ storage });

export async function uploadDocument(req: Request, res: Response, next: NextFunction) {
  try {
    const empId = req.params.id;
    const file = req.file;
    if (!file) return res.status(400).json({ message: 'No file' });
    const emp = await employeeService.getEmployeeById(empId);
    if (!emp) return res.status(404).json({ message: 'Employee not found' });
    emp.documents = emp.documents || [];
    emp.documents.push({ name: file.originalname, url: `/uploads/${file.filename}` });
    await emp.save();
    res.json(emp);
  } catch (err) { next(err); }
}

export async function createEmployee(req: Request, res: Response, next: NextFunction) {
  try {
    const doc = await employeeService.createEmployee(req.body);
    res.status(201).json(doc);
  } catch (err) { next(err); }
}

export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};


export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};


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
