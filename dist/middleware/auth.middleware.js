"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
exports.authenticate = authenticate;
exports.authMiddleware = authMiddleware;
const jwt_1 = require("../utils/jwt");
function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer '))
        return res.status(401).json({ message: 'No token' });
    const token = authHeader.split(' ')[1];
    try {
        const payload = (0, jwt_1.verifyAccess)(token);
        req.user = payload;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    console.log("Token received:", token);
}
const authorize = (roles) => (req, res, next) => {
    if (!req.user)
        return res.status(401).json({ message: 'Unauthenticated' });
    if (!roles.includes(req.user.role))
        return res.status(403).json({ message: 'Forbidden' });
    next();
};
exports.authorize = authorize;
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = (0, jwt_1.verifyAccess)(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }
}
