import { Request, Response } from "express";
import Leave from "../models/Leave";

// Apply Leave
export const createLeave = async (req: Request, res: Response) => {
  try {
    const leave = await Leave.create(req.body);
    res.status(201).json(leave);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Get All Leaves
export const getLeaves = async (req: Request, res: Response) => {
  try {
    const leaves = await Leave.find().populate("employee");
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Update Leave Status
export const updateLeave = async (req: Request, res: Response) => {
  try {
    const updated = await Leave.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Delete Leave
export const deleteLeave = async (req: Request, res: Response) => {
  try {
    await Leave.findByIdAndDelete(req.params.id);
    res.json({ message: "Leave deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
