"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const audit_controller_1 = require("../controllers/audit.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(['admin', 'hr']), audit_controller_1.createAudit); // Create audit log
router.get("/", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(['admin', 'hr']), audit_controller_1.getAudits); // Read all audit logs
exports.default = router;
