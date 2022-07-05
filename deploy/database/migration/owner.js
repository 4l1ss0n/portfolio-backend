"use strict";
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
exports.InsertOwnerApplication1655506036500 = void 0;
const dotenv_1 = require("dotenv");
const UsersModels_1 = __importDefault(require("../../app/models/UsersModels"));
const connection_1 = __importDefault(require("../connection"));
const bcrypt_1 = __importDefault(require("bcrypt"));
(0, dotenv_1.config)();
const { OWN_EMAIL, OWN_PASS, OWN_LNAME, OWN_FNAME } = process.env;
class InsertOwnerApplication1655506036500 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!OWN_PASS)
                throw "No password identify";
            const hash = bcrypt_1.default.hashSync(OWN_PASS, 2);
            yield connection_1.default.createQueryBuilder().insert().into(UsersModels_1.default).values({
                firstName: OWN_FNAME,
                lastName: OWN_LNAME,
                email: OWN_EMAIL,
                passwordHash: hash,
                userLevel: "owner"
            }).execute();
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.InsertOwnerApplication1655506036500 = InsertOwnerApplication1655506036500;
