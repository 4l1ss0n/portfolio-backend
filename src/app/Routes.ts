import { Router } from "express";
import ProjectControllers from "./controllers/ProjectsControllers";
import UsersControllers from "./controllers/UsersControllers";
import Authorization from "./middlewares/Authorization";

const routes = Router();

const User = new UsersControllers();
const Projects = new ProjectControllers();

routes.get("/v1/users", User.Index);
routes.get("/v1/users/login", User.Login);
routes.post("/v1/users/register", User.Register);


routes.get("/v1/projects", Projects.Index);
routes.get("/v1/projects/:id", Projects.Show);
routes.post("/v1/projects/create",Authorization, Projects.Store);
routes.put("/v1/projects/update",Authorization, Projects.Update);
routes.delete("/v1/projects/delete",Authorization, Projects.Delete);

export default routes;