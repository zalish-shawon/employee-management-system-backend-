"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AuditLogSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    action: { type: String, required: true },
    targetType: { type: String },
    targetId: { type: mongoose_1.Schema.Types.Mixed },
    meta: { type: mongoose_1.Schema.Types.Mixed }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('AuditLog', AuditLogSchema);
