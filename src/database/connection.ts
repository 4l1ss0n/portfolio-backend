import { DataSource } from "typeorm";
import "reflect-metadata";
import Project from "../app/models/ProjectsModels";
import Users from "../app/models/UsersModels";
import { config } from "dotenv";

config();

const {
  DB_USER,
  DB_NAME,
  DB_HOST,
  DB_PASSWORD
} = process.env;

const Database: DataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  logging: false,
  entities: [
    Project,
    Users
  ],
});

export default Database;