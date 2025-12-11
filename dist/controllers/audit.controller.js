"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAudits = exports.createAudit = void 0;
const AuditLog_1 = __importDefault(require("../models/AuditLog"));
// Create Audit Log
const createAudit = async (req, res) => {
    try {
        const log = await AuditLog_1.default.create(req.body);
        res.status(201).json(log);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
};
exports.createAudit = createAudit;
// Get All Audit Logs
const getAudits = async (req, res) => {
    try {
        const logs = await AuditLog_1.default.find().populate("user");
        res.json(logs);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
};
exports.getAudits = getAudits;
