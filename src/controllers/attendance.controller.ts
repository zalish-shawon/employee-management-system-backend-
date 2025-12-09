import { Request, Response } from "express";
import Attendance from "../models/Attendance";

// Create Attendance
export const createAttendance = async (req: Request, res: Response) => {
  try {
    const attendance = await Attendance.create(req.body);
    res.status(201).json(attendance);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Get All Attendance
export const getAttendance = async (req: Request, res: Response) => {
  try {
    const records = await Attendance.find().populate("employee");
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Update Attendance
export const updateAttendance = async (req: Request, res: Response) => {
  try {
    const updated = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Delete Attendance
export const deleteAttendance = async (req: Request, res: Response) => {
  try {
    await Attendance.findByIdAndDelete(req.params.id);
    res.json({ message: "Attendance deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
