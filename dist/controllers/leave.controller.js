"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLeave = exports.updateLeave = exports.getLeaves = exports.createLeave = void 0;
const Leave_1 = __importDefault(require("../models/Leave"));
// Apply Leave
const createLeave = async (req, res) => {
    try {
        const leave = await Leave_1.default.create(req.body);
        res.status(201).json(leave);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
};
exports.createLeave = createLeave;
// Get All Leaves
const getLeaves = async (req, res) => {
    try {
        const leaves = await Leave_1.default.find().populate("employee");
        res.json(leaves);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
};
exports.getLeaves = getLeaves;
// Update Leave Status
const updateLeave = async (req, res) => {
    try {
        const updated = await Leave_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
};
exports.updateLeave = updateLeave;
// Delete Leave
const deleteLeave = async (req, res) => {
    try {
        await Leave_1.default.findByIdAndDelete(req.params.id);
        res.json({ message: "Leave deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
};
exports.deleteLeave = deleteLeave;
