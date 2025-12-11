"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AttendanceSchema = new mongoose_1.Schema({
    employee: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Employee', required: true },
    clockIn: { type: Date },
    clockOut: { type: Date },
    status: { type: String, enum: ['present', 'absent', 'leave'], default: 'present' },
    date: { type: Date, required: true, index: true }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Attendance', AttendanceSchema);
