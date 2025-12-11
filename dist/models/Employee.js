"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const EmployeeSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    employeeId: { type: String, required: true, unique: true, index: true },
    department: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Department' },
    position: { type: String },
    dateOfJoining: { type: Date },
    phone: { type: String },
    address: { type: String },
    salary: { type: Number, default: 0 },
    documents: [{ name: String, url: String }]
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Employee', EmployeeSchema);
