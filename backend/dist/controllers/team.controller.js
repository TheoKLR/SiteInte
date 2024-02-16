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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTeamToFaction = exports.renameTeam = exports.deleteTeam = exports.addTeam = exports.getTeam = exports.getAllTeams = void 0;
const response_1 = require("../utils/response");
const service = __importStar(require("../services/team.service"));
const error_1 = require("../utils/error");
const getAllTeams = async (req, res) => {
    try {
        const entities = await service.getAllTeams();
        res.status(response_1.Code.OK).send(new response_1.HttpResponse(response_1.Code.OK, "Teams reached", entities));
    }
    catch (error) {
        (0, error_1.serviceError)(res, error);
    }
};
exports.getAllTeams = getAllTeams;
const getTeam = async (req, res) => {
    const { id } = req.params;
    const idNumber = parseInt(id, 10);
    if (isNaN(idNumber)) {
        (0, error_1.fetchingError)(res, "ID format not recognized");
    }
    try {
        const entitie = await service.getTeam(idNumber);
        res.status(response_1.Code.OK).send(new response_1.HttpResponse(response_1.Code.OK, "Team reached", entitie));
    }
    catch (err) {
        (0, error_1.serviceError)(res, err);
    }
};
exports.getTeam = getTeam;
const addTeam = async (req, res) => {
    const { name } = req.params;
    name ?? res.status(response_1.Code.BAD_REQUEST).json(new response_1.HttpResponse(response_1.Code.BAD_REQUEST, "no name"));
    try {
        await service.addTeam(name);
        res.status(response_1.Code.OK).send(new response_1.HttpResponse(response_1.Code.OK, "Team added"));
    }
    catch (err) {
        (0, error_1.serviceError)(res, err);
    }
};
exports.addTeam = addTeam;
const deleteTeam = async (req, res) => {
    const { id } = req.params;
    const idNumber = parseInt(id, 10);
    if (isNaN(idNumber)) {
        (0, error_1.fetchingError)(res, "ID format not recognized");
    }
    try {
        await service.deleteTeam(idNumber);
        res.status(response_1.Code.OK).send(new response_1.HttpResponse(response_1.Code.OK, "Team deleted"));
    }
    catch (err) {
        (0, error_1.serviceError)(res, err);
    }
};
exports.deleteTeam = deleteTeam;
const renameTeam = async (req, res) => {
    const { id, name } = req.params;
    const idNumber = parseInt(id, 10);
    name ?? (0, error_1.fetchingError)(res, "no name");
    if (isNaN(idNumber)) {
        (0, error_1.fetchingError)(res, "ID format not recognized");
    }
    try {
        await service.renameTeam(name, idNumber);
        res.status(response_1.Code.OK).send(new response_1.HttpResponse(response_1.Code.OK, "Team renamed"));
    }
    catch (err) {
        (0, error_1.serviceError)(res, err);
    }
};
exports.renameTeam = renameTeam;
const addTeamToFaction = async (req, res) => {
    const { teamId, factionId } = req.params;
    const teamIdNumber = parseInt(teamId, 10);
    const factionIdNumber = parseInt(factionId, 10);
    if (isNaN(teamIdNumber)) {
        (0, error_1.fetchingError)(res, "ID format not recognized");
    }
    if (isNaN(factionIdNumber)) {
        (0, error_1.fetchingError)(res, "ID format not recognized");
    }
    try {
        await service.addTeamToFaction(teamIdNumber, factionIdNumber);
        res.status(response_1.Code.OK).send(new response_1.HttpResponse(response_1.Code.OK, "Team modified"));
    }
    catch (err) {
        (0, error_1.serviceError)(res, err);
    }
};
exports.addTeamToFaction = addTeamToFaction;
//# sourceMappingURL=team.controller.js.map