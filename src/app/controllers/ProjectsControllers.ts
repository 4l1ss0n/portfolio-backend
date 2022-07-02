import { Response as Res, Request as Req } from "express";
import Database from "../../database/connection";
import Project from "../models/ProjectsModels";
import { ProjectViewMany, ProjectViewSingle } from "../views/ProjectViews";
import * as yup from "yup";

class ProjectControllers {
    async Index(req: Req, res: Res): Promise<Res<any>> {
        try {
            const ProjectsR = Database.getRepository(Project);

            const response = await ProjectsR.find();

            return res.status(200).json(ProjectViewMany(response));
        } catch (err) {
            console.log(err);
            return res.status(500).json({err});
        }
    };

    async Show(req: Req, res: Res): Promise<Res<any>> {
        const id = req.params.id;
        try {
            if (!yup.string().uuid().isValidSync(id)) return res.status(401).json({err: "no valid parameter"})
            const ProjectsR = Database.getRepository(Project);

            const response = await ProjectsR.findOne({
                where: {
                    id
                }
            });

            if (!response) return res.status(404).json({err: "project not found"});

            return res.status(200).json(ProjectViewSingle(response));
        } catch (err) {
            console.log(err);
            return res.status(500).json({err});
        }
    };

    async Store(req: Req, res: Res): Promise<Res<any>> {
        const {
            title,
            description,
            githubUrl,
            hostUrl,
            img,
            auth
        } = req.body;
        try {
            if (!auth) return res.status(401).json({err: "permition denied"});
            if (auth.userLevel !== "owner") return res.status(401).json({err: "permition denied"});

            const ProjectR = Database.getRepository(Project);

            const project = ProjectR.create({
                title,
                description,
                githubUrl,
                hostUrl: hostUrl? hostUrl: null,
                img: img? img: null
            });

            await ProjectR.save(project);
            return res.status(200).json(ProjectViewSingle(project));
        } catch (err) {
            console.log(err);
            return res.status(500).json({err});
        }
    };

    async Update(req: Req, res: Res): Promise<Res<any>> {
        const {auth} = req.body;
        try {
            if (!auth) return res.status(401).json({err: "permition denied"});
            if (auth.userLevel !== "owner") return res.status(401).json({err: "permition denied"});
            return res.status(200).json({});
        } catch (err) {
            console.log(err);
            return res.status(500).json({err});
        }
    };

    async Delete(req: Req, res: Res): Promise<Res<any>> {
        const {auth} = req.body;
        try {
            if (!auth) return res.status(401).json({err: "permition denied"});
            if (auth.userLevel !== "owner") return res.status(401).json({err: "permition denied"});
            return res.status(200).json({});
        } catch (err) {
            console.log(err);
            return res.status(500).json({err});
        }
    };
}

export default ProjectControllers;