"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmployee = createEmployee;
exports.listEmployees = listEmployees;
exports.getEmployeeById = getEmployeeById;
const Employee_1 = __importDefault(require("../models/Employee"));
const User_1 = __importDefault(require("../models/User"));
async function createEmployee(payload) {
    // if userId provided, validate
    if (payload.userId) {
        const user = await User_1.default.findById(payload.userId);
        if (!user)
            throw { status: 400, message: 'user not found' };
    }
    const doc = await Employee_1.default.create(payload);
    return doc;
}
async function listEmployees(query) {
    const { skip, limit, sort } = query;
    const filter = {};
    if (query.q)
        filter.$or = [
            { employeeId: { $regex: query.q, $options: 'i' } },
        ];
    const total = await Employee_1.default.countDocuments(filter);
    const items = await Employee_1.default.find(filter).skip(skip).limit(limit).sort(sort).populate('user').lean();
    return { total, items };
}
async function getEmployeeById(id) {
    return Employee_1.default.findById(id).populate('user');
}
