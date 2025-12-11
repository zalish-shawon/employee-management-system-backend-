"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployee = exports.upload = void 0;
exports.uploadDocument = uploadDocument;
exports.createEmployee = createEmployee;
exports.listEmployees = listEmployees;
exports.getEmployee = getEmployee;
const employeeService = __importStar(require("../services/employee.service"));
const paginator_1 = require("../utils/paginator");
const Employee_1 = __importDefault(require("../models/Employee"));
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const config_1 = require("../config");
const uploadDir = config_1.config.UPLOAD_DIR;
if (!fs_1.default.existsSync(uploadDir))
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
exports.upload = (0, multer_1.default)({ storage });
async function uploadDocument(req, res, next) {
    try {
        const empId = req.params.id;
        const file = req.file;
        if (!file)
            return res.status(400).json({ message: 'No file' });
        const emp = await employeeService.getEmployeeById(empId);
        if (!emp)
            return res.status(404).json({ message: 'Employee not found' });
        emp.documents = emp.documents || [];
        emp.documents.push({ name: file.originalname, url: `/uploads/${file.filename}` });
        await emp.save();
        res.json(emp);
    }
    catch (err) {
        next(err);
    }
}
async function createEmployee(req, res, next) {
    try {
        const doc = await employeeService.createEmployee(req.body);
        res.status(201).json(doc);
    }
    catch (err) {
        next(err);
    }
}
const updateEmployee = async (req, res) => {
    try {
        const employee = await Employee_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(employee);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
};
exports.updateEmployee = updateEmployee;
const deleteEmployee = async (req, res) => {
    try {
        await Employee_1.default.findByIdAndDelete(req.params.id);
        res.json({ message: "Employee deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
};
exports.deleteEmployee = deleteEmployee;
async function listEmployees(req, res, next) {
    try {
        const page = (0, paginator_1.buildPagination)(req.query);
        const result = await employeeService.listEmployees(page);
        res.json(result);
    }
    catch (err) {
        next(err);
    }
}
async function getEmployee(req, res, next) {
    try {
        const doc = await employeeService.getEmployeeById(req.params.id);
        if (!doc)
            return res.status(404).json({ message: 'Not found' });
        res.json(doc);
    }
    catch (err) {
        next(err);
    }
}
