"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const Routes_1 = __importDefault(require("./Routes"));
const dotenv_1 = require("dotenv");
const connection_1 = __importDefault(require("../database/connection"));
(0, dotenv_1.config)();
connection_1.default.initialize().then(res => {
    console.log("DB CONNECTED");
}).catch(err => {
    console.log(err);
    process.exit();
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(Routes_1.default);
exports.default = app;
