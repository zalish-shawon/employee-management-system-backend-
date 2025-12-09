import { Router } from "express";
import {
  createDepartment,
  getDepartments,
  updateDepartment,
  deleteDepartment
} from "../controllers/department.controller";
import { authenticate, authorize } from "../middleware/auth.middleware";

const router = Router();

router.post("/create-department", authenticate, authorize(['admin','hr']), createDepartment);     // Create
router.get("/allDepartments", authenticate, authorize(['admin','hr']), getDepartments);       // Read all
router.put("/:id", authenticate, authorize(['admin','hr']), updateDepartment);  // Update
router.delete("/:id", authenticate, authorize(['admin','hr']), deleteDepartment); // Delete

export default router;
