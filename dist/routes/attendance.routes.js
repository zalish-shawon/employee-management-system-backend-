"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const attendance_controller_1 = require("../controllers/attendance.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post("/create-attendance", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(['admin', 'hr', 'manager', 'employee']), attendance_controller_1.createAttendance); // Create
router.get("/allAttendance", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(['admin', 'hr']), attendance_controller_1.getAttendance); // Read all
router.put("/:id", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(['admin', 'hr']), attendance_controller_1.updateAttendance); // Update
router.delete("/:id", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(['admin', 'hr']), attendance_controller_1.deleteAttendance); // Delete
exports.default = router;
