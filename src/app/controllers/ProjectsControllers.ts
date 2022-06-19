import { Response as Res, Request as Req } from "express";
import Database from "../../database/connection";
import Users from "../models/ProjectsModels";


class ProjectControllers {
    async Index(req: Req, res: Res): Promise<Res<any>> {
        try {
            return res.status(200).json({});
        } catch (err) {
            console.log(err);
            return res.status(500).json({err});
        }
    }
}