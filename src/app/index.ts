import express from "express";
import cors from "cors";
import routes from "./Routes";
import { config } from "dotenv";
import Database from '../database/connection';

config();

Database.initialize().then(res => {
  console.log("DB CONNECTED");
}).catch(err => {
  console.log(err);
  process.exit();
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);


export default app;