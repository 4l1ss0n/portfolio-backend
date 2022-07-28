"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../../database/connection"));
const ProjectsModels_1 = __importDefault(require("../models/ProjectsModels"));
const ProjectViews_1 = require("../views/ProjectViews");
const yup = __importStar(require("yup"));
const cloudinary_1 = require("cloudinary");
class ProjectControllers {
    Index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ProjectsR = connection_1.default.getRepository(ProjectsModels_1.default);
                const response = yield ProjectsR.find();
                return res.status(200).json((0, ProjectViews_1.ProjectViewMany)(response));
            }
            catch (err) {
                console.log(err);
                return res.status(500).json({ err });
            }
        });
    }
    ;
    Show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                if (!yup.string().uuid().isValidSync(id))
                    return res.status(401).json({ err: "no valid parameter" });
                const ProjectsR = connection_1.default.getRepository(ProjectsModels_1.default);
                const response = yield ProjectsR.findOne({
                    where: {
                        id
                    }
                });
                if (!response)
                    return res.status(404).json({ err: "project not found" });
                return res.status(200).json((0, ProjectViews_1.ProjectViewSingle)(response));
            }
            catch (err) {
                console.log(err);
                return res.status(500).json({ err });
            }
        });
    }
    ;
    Store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, techs, githubUrl, hostUrl, auth, img } = req.body;
            try {
                if (!auth)
                    return res.status(401).json({ err: "permition denied" });
                if (auth.userLevel !== "owner")
                    return res.status(401).json({ err: "permition denied" });
                const ProjectR = connection_1.default.getRepository(ProjectsModels_1.default);
                let imgUrl;
                if (img) {
                    yield cloudinary_1.v2.uploader.upload(img, {
                        folder: process.env.IMG_PATH
                    }, (err, result) => {
                        if (result) {
                            imgUrl = result.url;
                            return;
                        }
                    });
                }
                const project = ProjectR.create({
                    title,
                    description,
                    techs: JSON.stringify(techs),
                    githubUrl,
                    hostUrl: hostUrl ? hostUrl : null,
                    img: imgUrl
                });
                yield ProjectR.save(project);
                return res.status(200).json((0, ProjectViews_1.ProjectViewSingle)(project));
            }
            catch (err) {
                console.log(err);
                return res.status(500).json({ err });
            }
        });
    }
    ;
    Update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { auth } = req.body;
            try {
                if (!auth)
                    return res.status(401).json({ err: "permition denied" });
                if (auth.userLevel !== "owner")
                    return res.status(401).json({ err: "permition denied" });
                return res.status(200).json({});
            }
            catch (err) {
                console.log(err);
                return res.status(500).json({ err });
            }
        });
    }
    ;
    Delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { auth } = req.body;
            try {
                if (!auth)
                    return res.status(401).json({ err: "permition denied" });
                if (auth.userLevel !== "owner")
                    return res.status(401).json({ err: "permition denied" });
                return res.status(200).json({});
            }
            catch (err) {
                console.log(err);
                return res.status(500).json({ err });
            }
        });
    }
    ;
}
exports.default = ProjectControllers;
