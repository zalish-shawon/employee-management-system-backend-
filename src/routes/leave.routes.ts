import { Router } from "express";
import {
  createLeave,
  getLeaves,
  updateLeave,
  deleteLeave
} from "../controllers/leave.controller";
import { authenticate, authorize } from "../middleware/auth.middleware";

const router = Router();

router.post("/create-leave", authenticate, authorize(['admin','hr', 'manager', 'employee']), createLeave);      // Apply Leave
router.get("/allLeaves", authenticate, authorize(['admin','hr']), getLeaves);         // Get all leaves
router.put("/:id", authenticate, authorize(['admin','hr']), updateLeave);    // Update leave status
router.delete("/:id", authenticate, authorize(['admin','hr']), deleteLeave); // Delete leave

export default router;
