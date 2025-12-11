"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmployeeSchema = void 0;
const zod_1 = require("zod");
exports.createEmployeeSchema = {
    body: zod_1.z.object({
        userId: zod_1.z.string().optional(),
        employeeId: zod_1.z.string().min(1).optional(),
        position: zod_1.z.string().optional(),
        department: zod_1.z.string().optional(),
        dateOfJoining: zod_1.z.string().optional(),
        phone: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        salary: zod_1.z.number().optional()
    })
};
