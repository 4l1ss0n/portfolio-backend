import { Response as Res, Request as Req } from "express";
import { RepositoryNotTreeError } from "typeorm";
import Database from "../../database/connection";
import Project from "../models/ProjectsModels";


class ProjectControllers {
    async Index(req: Req, res: Res): Promise<Res<any>> {
        try {
            const ProjectsR = Database.getRepository(Project);

            const response = await ProjectsR.find();

            return res.status(200).json(response);
        } catch (err) {
            console.log(err);
            return res.status(500).json({err});
        }
    };

    async Show(req: Req, res: Res): Promise<Res<any>> {
        const id = req.params.id;
        try {
            if (id.split("-").length !== 5 ) return res.status(401).json({err: "no valid parameter"})
            const ProjectsR = Database.getRepository(Project);

            const response = await ProjectsR.findOne({
                where: {
                    id
                }
            });

            if (!response) return res.status(404).json({err: "project not found"});

            return res.status(200).json(response);
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
        } = req.body;
        try {
            const ProjectR = Database.getRepository(Project);

            const project = ProjectR.create({
                title,
                description,
                githubUrl,
                hostUrl: hostUrl? hostUrl: null
            });

            await ProjectR.save(project);
            return res.status(200).json(project);
        } catch (err) {
            console.log(err);
            return res.status(500).json({err});
        }
    };

    async Update(req: Req, res: Res): Promise<Res<any>> {
        try {
            return res.status(200).json({});
        } catch (err) {
            console.log(err);
            return res.status(500).json({err});
        }
    };

    async Delete(req: Req, res: Res): Promise<Res<any>> {
        try {
            return res.status(200).json({});
        } catch (err) {
            console.log(err);
            return res.status(500).json({err});
        }
    };
}

export default ProjectControllers;