import { Request as Req, Response as Res, NextFunction as Nx } from "express";
import jwt from "jsonwebtoken";

const {SECRET} = process.env;

export default (req: Req, res: Res, nxt: Nx) => {
    const credentials = req.headers.authorization;
    if (!credentials) return res.status(404).json({err: "Token not found"});
    const [, token] = credentials.split(" ");
    if (!token) return res.status(404).json({err: "token not found"});

    if (!SECRET) return res.status(500).json({err: "server internal error"});

    jwt.verify(token, SECRET, (err, decode) => {
        if (err) return res.status(401).json({err: err.message});

        req.body.auth = decode;
        nxt();
    });
};