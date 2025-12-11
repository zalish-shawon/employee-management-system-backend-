"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
const User_1 = __importDefault(require("../models/User"));
const Department_1 = __importDefault(require("../models/Department"));
const Employee_1 = __importDefault(require("../models/Employee"));
const password_1 = require("../utils/password");
async function seed() {
    await mongoose_1.default.connect(config_1.config.MONGO_URI);
    console.log('Connected for seeding');
    await User_1.default.deleteMany({});
    await Employee_1.default.deleteMany({});
    await Department_1.default.deleteMany({});
    const adminPass = await (0, password_1.hashPassword)('password123');
    const admin = await User_1.default.create({ name: 'Admin', email: 'admin@example.com', password: adminPass, role: 'admin' });
    console.log('admin created', admin.email);
    const hr = await User_1.default.create({ name: 'HR', email: 'hr@example.com', password: adminPass, role: 'hr' });
    const dep = await Department_1.default.create({ name: 'Engineering', code: 'ENG' });
    const emp = await User_1.default.create({ name: 'John Doe', email: 'john@example.com', password: adminPass, role: 'employee' });
    await Employee_1.default.create({ user: emp._id, employeeId: 'EMP-1001', department: dep._id, position: 'Developer', salary: 50000 });
    console.log('seed complete');
    process.exit(0);
}
seed().catch(err => {
    console.error(err);
    process.exit(1);
});
