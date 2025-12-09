import { Request, Response } from "express";
import AuditLog from "../models/AuditLog";

// Create Audit Log
export const createAudit = async (req: Request, res: Response) => {
  try {
    const log = await AuditLog.create(req.body);
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Get All Audit Logs
export const getAudits = async (req: Request, res: Response) => {
  try {
    const logs = await AuditLog.find().populate("user");
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
