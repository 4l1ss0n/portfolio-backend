import express from "express";
import cors from "cors";
import routes from "./Routes";
import { config } from "dotenv";
import Database from '../database/connection';
import { v2 as imgCloud } from "cloudinary";

config();

const {
  CLOUD_NAME,
  API_KEY,
  API_SECRET
} = process.env;

Database.initialize().then(res => {
  console.log("DB CONNECTED");
}).catch(err => {
  console.log(err);
  process.exit();
});

imgCloud.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
  secure: true
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);


export default app;