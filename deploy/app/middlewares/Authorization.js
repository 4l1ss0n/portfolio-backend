"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { SECRET } = process.env;
exports.default = (req, res, nxt) => {
    const credentials = req.headers.authorization;
    if (!credentials)
        return res.status(404).json({ err: "Token not found" });
    const [, token] = credentials.split(" ");
    if (!token)
        return res.status(404).json({ err: "token not found" });
    if (!SECRET)
        return res.status(500).json({ err: "server internal error" });
    jsonwebtoken_1.default.verify(token, SECRET, (err, decode) => {
        if (err)
            return res.status(401).json({ err: err.message });
        req.body.auth = decode;
        nxt();
    });
};
