"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDepartment = exports.updateDepartment = exports.getDepartment = exports.getDepartments = exports.createDepartment = void 0;
const Department_1 = __importDefault(require("../models/Department"));
// Create Department
const createDepartment = async (req, res) => {
    try {
        const dept = await Department_1.default.create(req.body);
        res.status(201).json(dept);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
};
exports.createDepartment = createDepartment;
// Get All Departments
const getDepartments = async (req, res) => {
    try {
        const depts = await Department_1.default.find();
        res.json(depts);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
};
exports.getDepartments = getDepartments;
// Get Single Department
const getDepartment = async (req, res) => {
    try {
        const dept = await Department_1.default.findById(req.params.id);
        if (!dept) {
            return res.status(404).json({ message: "Department not found" });
        }
        res.json(dept);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
};
exports.getDepartment = getDepartment;
// Update Department
const updateDepartment = async (req, res) => {
    try {
        const updated = await Department_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
};
exports.updateDepartment = updateDepartment;
// Delete Department
const deleteDepartment = async (req, res) => {
    try {
        await Department_1.default.findByIdAndDelete(req.params.id);
        res.json({ message: "Department deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
};
exports.deleteDepartment = deleteDepartment;
