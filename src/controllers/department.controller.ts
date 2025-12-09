import { Request, Response } from "express";
import Department from "../models/Department";

// Create Department
export const createDepartment = async (req: Request, res: Response) => {
  try {
    const dept = await Department.create(req.body);
    res.status(201).json(dept);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Get All Departments
export const getDepartments = async (req: Request, res: Response) => {
  try {
    const depts = await Department.find();
    res.json(depts);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Update Department
export const updateDepartment = async (req: Request, res: Response) => {
  try {
    const updated = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Delete Department
export const deleteDepartment = async (req: Request, res: Response) => {
  try {
    await Department.findByIdAndDelete(req.params.id);
    res.json({ message: "Department deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
