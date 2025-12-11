"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signAccess = signAccess;
exports.signRefresh = signRefresh;
exports.verifyAccess = verifyAccess;
exports.verifyRefresh = verifyRefresh;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
function signAccess(payload) {
    // Fix 1: Cast 'payload' to object (or string) to pick a specific overload
    // Fix 2: Cast 'expiresIn' to 'any' to bypass the StringValue mismatch error
    return jsonwebtoken_1.default.sign(payload, config_1.config.JWT_SECRET, {
        expiresIn: config_1.config.ACCESS_TOKEN_EXPIRY,
    });
}
function signRefresh(payload) {
    return jsonwebtoken_1.default.sign(payload, config_1.config.JWT_REFRESH_SECRET, {
        expiresIn: config_1.config.REFRESH_TOKEN_EXPIRY,
    });
}
function verifyAccess(token) {
    return jsonwebtoken_1.default.verify(token, config_1.config.JWT_SECRET);
}
function verifyRefresh(token) {
    return jsonwebtoken_1.default.verify(token, config_1.config.JWT_REFRESH_SECRET);
}
