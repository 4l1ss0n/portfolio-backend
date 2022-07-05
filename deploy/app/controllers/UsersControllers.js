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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../../database/connection"));
const UsersModels_1 = __importDefault(require("../models/UsersModels"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const yup = __importStar(require("yup"));
const authGen_1 = __importDefault(require("../middlewares/authGen"));
;
class UsersControllers {
    Index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const UserR = connection_1.default.getRepository(UsersModels_1.default);
                const response = yield UserR.find();
                const users = response.map(user => ({
                    fName: user.firstName,
                    lName: user.lastName,
                    email: user.email
                }));
                return res.status(200).json(users);
            }
            catch (err) {
                return res.status(500).json({
                    err
                });
            }
            ;
        });
    }
    ;
    Register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, email, password } = req.body;
            try {
                if (!(yup.string().email().isValidSync(email) &&
                    yup.string().isValidSync(firstName) &&
                    yup.string().isValidSync(lastName) &&
                    yup.string().isValidSync(password)))
                    return res.status(401).json({ err: "invalid inputs" });
                const UserR = connection_1.default.getRepository(UsersModels_1.default);
                const alrealyExist = yield UserR.findOne({
                    where: {
                        email
                    }
                });
                if (alrealyExist)
                    return res.status(405).json({ err: "email alrealy register" });
                const passwordHash = bcrypt_1.default.hashSync(password, 2);
                const user = UserR.create({
                    firstName,
                    lastName,
                    email,
                    passwordHash
                });
                yield UserR.save(user);
                return res.status(201).json({ id: user.id });
            }
            catch (err) {
                return res.status(500).json({
                    err
                });
            }
            ;
        });
    }
    ;
    Login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const credentials = req.headers.authorization;
            try {
                const UserR = connection_1.default.getRepository(UsersModels_1.default);
                if (!credentials)
                    return res.status(404).json({ err: "not credentials found" });
                const [basic, hash] = credentials.split(" ");
                if (!hash)
                    return res.status(401).json({ err: "bad formed credentials" });
                const [email, password] = Buffer.from(hash, "base64").toString().split(":");
                if (!(yup.string().email().isValidSync(email)))
                    return res.status(401).json({ err: "invalid email" });
                const response = yield UserR.findOne({
                    where: {
                        email
                    }
                });
                if (!response)
                    return res.status(404).json({ err: "user not found with this email" });
                if (!bcrypt_1.default.compareSync(password, response.passwordHash))
                    return res.status(401).json({ err: "incorrect passoword" });
                return res.status(200).json({
                    fName: response.firstName,
                    email: response.email,
                    token: (0, authGen_1.default)({
                        email: response.email,
                        id: response.id,
                        userLevel: response.userLevel
                    })
                });
            }
            catch (err) {
                return res.status(500).json({
                    err
                });
            }
            ;
        });
    }
    ;
}
exports.default = UsersControllers;
