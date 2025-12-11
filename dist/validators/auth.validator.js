"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = {
    body: zod_1.z.object({
        email: zod_1.z.email(),
        password: zod_1.z.string().min(6),
        name: zod_1.z.string().min(1),
        role: zod_1.z.enum(['admin', 'hr', 'manager', 'employee']).optional()
    })
};
exports.loginSchema = {
    body: zod_1.z.object({
        email: zod_1.z.email(),
        password: zod_1.z.string().min(6)
    })
};
