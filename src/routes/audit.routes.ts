import { Router } from "express";
import { createAudit, getAudits } from "../controllers/audit.controller";
import { authenticate, authorize } from "../middleware/auth.middleware";

const router = Router();

router.post("/", authenticate, authorize(['admin','hr']), createAudit); // Create audit log
router.get("/", authenticate, authorize(['admin','hr']), getAudits);    // Read all audit logs

export default router;
