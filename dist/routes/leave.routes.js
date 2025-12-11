"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leave_controller_1 = require("../controllers/leave.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post("/create-leave", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(['admin', 'hr', 'manager', 'employee']), leave_controller_1.createLeave); // Apply Leave
router.get("/allLeaves", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(['admin', 'hr']), leave_controller_1.getLeaves); // Get all leaves
router.put("/:id", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(['admin', 'hr']), leave_controller_1.updateLeave); // Update leave status
router.delete("/:id", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(['admin', 'hr']), leave_controller_1.deleteLeave); // Delete leave
exports.default = router;
