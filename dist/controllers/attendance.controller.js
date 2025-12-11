"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAttendance = exports.updateAttendance = exports.getAttendance = exports.createAttendance = void 0;
const Attendance_1 = __importDefault(require("../models/Attendance"));
// Create Attendance
const createAttendance = async (req, res) => {
    try {
        const attendance = await Attendance_1.default.create(req.body);
        res.status(201).json(attendance);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
};
exports.createAttendance = createAttendance;
// Get All Attendance
const getAttendance = async (req, res) => {
    try {
        const records = await Attendance_1.default.find().populate("employee");
        res.json(records);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
};
exports.getAttendance = getAttendance;
// Update Attendance
const updateAttendance = async (req, res) => {
    try {
        const updated = await Attendance_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
};
exports.updateAttendance = updateAttendance;
// Delete Attendance
const deleteAttendance = async (req, res) => {
    try {
        await Attendance_1.default.findByIdAndDelete(req.params.id);
        res.json({ message: "Attendance deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
};
exports.deleteAttendance = deleteAttendance;
