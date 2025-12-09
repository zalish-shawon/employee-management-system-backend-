import { Router } from "express";
import {
  createAttendance,
  getAttendance,
  updateAttendance,
  deleteAttendance
} from "../controllers/attendance.controller";
import { authenticate, authorize } from "../middleware/auth.middleware";

const router = Router();

router.post("/create-attendance", authenticate, authorize(['admin','hr', 'manager', 'employee']), createAttendance);    // Create
router.get("/allAttendance", authenticate, authorize(['admin','hr']), getAttendance);        // Read all
router.put("/:id", authenticate, authorize(['admin','hr']), updateAttendance);  // Update
router.delete("/:id", authenticate, authorize(['admin','hr']), deleteAttendance); // Delete

export default router;
