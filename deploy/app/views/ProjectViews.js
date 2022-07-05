"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectViewMany = exports.ProjectViewSingle = void 0;
;
function ProjectViewSingle(project) {
    return {
        id: project.id,
        title: project.title,
        description: project.description,
        techs: JSON.parse(project.techs),
        githubUrl: project.githubUrl,
        hostUrl: project.hostUrl,
        img: project.img
    };
}
exports.ProjectViewSingle = ProjectViewSingle;
;
function ProjectViewMany(projects) {
    return projects.map(project => ProjectViewSingle(project));
}
exports.ProjectViewMany = ProjectViewMany;
;
