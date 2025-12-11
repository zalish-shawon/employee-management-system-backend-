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
exports.meController = exports.logout = void 0;
exports.register = register;
exports.login = login;
const authService = __importStar(require("../services/auth.service"));
const User_1 = __importDefault(require("../models/User"));
const RefreshToken_1 = require("../models/RefreshToken");
async function register(req, res, next) {
    try {
        const { user, accessToken, refreshToken } = await authService.register(req.body);
        res.status(201).json({ user, accessToken, refreshToken });
    }
    catch (err) {
        next(err);
    }
}
async function login(req, res, next) {
    try {
        const { user, accessToken, refreshToken } = await authService.login(req.body.email, req.body.password);
        res.json({ user, accessToken, refreshToken });
    }
    catch (err) {
        next(err);
    }
}
const logout = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(400).json({ message: "Refresh token required" });
        }
        // Remove from DB
        await RefreshToken_1.RefreshToken.findOneAndDelete({ token: refreshToken });
        res.json({ message: "Logged out successfully" });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
};
exports.logout = logout;
const meController = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User_1.default.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({
            message: "User profile fetched successfully",
            user,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch user profile", error });
    }
};
exports.meController = meController;
