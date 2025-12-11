"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("./app");
const config_1 = require("./config");
async function start() {
    await mongoose_1.default.connect(config_1.config.MONGO_URI);
    console.log('Connected to MongoDB');
    app_1.app.listen(Number(config_1.config.PORT), () => {
        console.log(`Server running on http://localhost:${config_1.config.PORT}`);
    });
}
start().catch(err => {
    console.error('Failed to start', err);
    process.exit(1);
});
