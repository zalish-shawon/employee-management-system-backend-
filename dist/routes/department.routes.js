"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const department_controller_1 = require("../controllers/department.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post("/create-department", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(['admin', 'hr']), department_controller_1.createDepartment); // Create
router.get("/allDepartments", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(['admin', 'hr']), department_controller_1.getDepartments);
router.get("/:id", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(['admin', 'hr']), department_controller_1.getDepartment); // Read all
router.put("/update/:id", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(['admin', 'hr']), department_controller_1.updateDepartment); // Update
router.delete("/:id", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(['admin', 'hr']), department_controller_1.deleteDepartment); // Delete
exports.default = router;
