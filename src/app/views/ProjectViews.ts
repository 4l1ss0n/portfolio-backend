import Project from "../models/ProjectsModels";


interface ProjectInputType extends Project {};

interface ProjectOutputType {
    id: string;
    title: string;
    description: string;
    techs: string[];
    githubUrl: string;
    hostUrl: string | null;
    img: string | null;
}


export function ProjectViewSingle(project: ProjectInputType): ProjectOutputType {
    return {
        id: project.id,
        title: project.title,
        description: project.description,
        techs: JSON.parse(project.techs),
        githubUrl: project.githubUrl,
        hostUrl: project.hostUrl,
        img: project.img
    };
};

export function ProjectViewMany(projects: ProjectInputType[]): ProjectOutputType[] {
    return projects.map(project => ProjectViewSingle(project));
};