"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    PORT: process.env.PORT || "5000",
    NODE_ENV: process.env.NODE_ENV || "development",
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY || "15m",
    REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY || "7d",
    SALT_ROUNDS: Number(process.env.SALT_ROUNDS) || 10,
    UPLOAD_DIR: process.env.UPLOAD_DIR || "uploads",
    FRONTEND_ORIGIN: process.env.FRONTEND_ORIGIN || "https://employee-management-system-frontend-chi.vercel.app"
};
