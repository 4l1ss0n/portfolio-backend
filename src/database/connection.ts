import { DataSource } from "typeorm";
import "reflect-metadata";
import Project from "../app/models/ProjectsModels";
import Users from "../app/models/UsersModels";

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
  synchronize: true,
  logging: true,
  entities: [
    Project,
    Users
  ],
});

export default Database;