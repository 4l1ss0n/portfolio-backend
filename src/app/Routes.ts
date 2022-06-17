import { Router } from "express";
import UsersControllers from "./controllers/UsersControllers";

const routes = Router();

const User = new UsersControllers();

routes.get("/v1/users", User.Index);
routes.get("/v1/users/login", User.Login);
routes.post("/v1/users/register", User.Register);


export default routes;