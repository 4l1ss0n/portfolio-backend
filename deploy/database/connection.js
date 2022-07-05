"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
require("reflect-metadata");
const ProjectsModels_1 = __importDefault(require("../app/models/ProjectsModels"));
const UsersModels_1 = __importDefault(require("../app/models/UsersModels"));
const dotenv_1 = require("dotenv");
const owner_1 = require("./migration/owner");
(0, dotenv_1.config)();
const { DB_USER, DB_NAME, DB_HOST, DB_PASSWORD } = process.env;
const Database = new typeorm_1.DataSource({
    type: "postgres",
    host: DB_HOST,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    logging: false,
    entities: [
        ProjectsModels_1.default,
        UsersModels_1.default
    ],
    migrations: [
        owner_1.InsertOwnerApplication1655506036500
    ]
});
exports.default = Database;
