"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
const User_1 = __importDefault(require("../models/User"));
const Employee_1 = __importDefault(require("../models/Employee"));
const password_1 = require("../utils/password");
const jwt_1 = require("../utils/jwt");
async function register(payload) {
    const existing = await User_1.default.findOne({ email: payload.email });
    if (existing)
        throw { status: 400, message: 'Email already used' };
    const hashed = await (0, password_1.hashPassword)(payload.password);
    const user = await User_1.default.create({ email: payload.email, password: hashed, name: payload.name, role: payload.role || 'employee' });
    // Optionally create Employee doc if role != admin
    if (user.role !== 'admin') {
        await Employee_1.default.create({ user: user._id, employeeId: `EMP-${Date.now()}` });
    }
    const accessToken = (0, jwt_1.signAccess)({ id: user._id, role: user.role });
    const refreshToken = (0, jwt_1.signRefresh)({ id: user._id, role: user.role });
    return {
        message: 'Registration successful!',
        user,
        accessToken,
        refreshToken
    };
}
async function login(email, password) {
    const user = await User_1.default.findOne({ email });
    if (!user)
        throw { status: 400, message: 'Invalid credentials' };
    const ok = await (0, password_1.comparePassword)(password, user.password);
    if (!ok)
        throw { status: 400, message: 'Invalid credentials' };
    const accessToken = (0, jwt_1.signAccess)({ id: user._id, role: user.role });
    const refreshToken = (0, jwt_1.signRefresh)({ id: user._id, role: user.role });
    return {
        message: 'Login successful!',
        user,
        accessToken,
        refreshToken
    };
}
