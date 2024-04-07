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
exports.registerTeam = exports.addToFaction = exports.deleteTeam = exports.createTeam = exports.getTeam = exports.getAllTeams = void 0;
const service = __importStar(require("../services/team.service"));
const user_service = __importStar(require("../services/user.service"));
const responses_1 = require("../utils/responses");
const getAllTeams = async (req, res, next) => {
    try {
        const data = await service.getAllTeams();
        (0, responses_1.Ok)(res, { data });
    }
    catch (error) {
        (0, responses_1.Error)(res, { error });
    }
};
exports.getAllTeams = getAllTeams;
const getTeam = async (req, res, next) => {
    const { id } = req.params;
    const idNumber = parseInt(id, 10);
    if (isNaN(idNumber))
        return (0, responses_1.Error)(res, { msg: 'could not parse Id' });
    try {
        const data = await service.getTeam(idNumber);
        (0, responses_1.Ok)(res, { data });
    }
    catch (error) {
        (0, responses_1.Error)(res, { error });
    }
};
exports.getTeam = getTeam;
const createTeam = async (req, res, next) => {
    const { name } = req.body;
    name ?? (0, responses_1.Error)(res, { msg: "No name" });
    try {
        await service.createTeam(name);
        (0, responses_1.Created)(res, {});
    }
    catch (error) {
        (0, responses_1.Error)(res, { error });
    }
};
exports.createTeam = createTeam;
const deleteTeam = async (req, res, next) => {
    const { id } = req.params;
    const idNumber = parseInt(id, 10);
    if (isNaN(idNumber))
        return (0, responses_1.Error)(res, { msg: 'could not parse Id' });
    try {
        await user_service.removeUsersFromTeam(idNumber);
        await service.deleteTeam(idNumber);
        (0, responses_1.Ok)(res, { msg: "Team deleted" });
    }
    catch (error) {
        (0, responses_1.Error)(res, { error });
    }
};
exports.deleteTeam = deleteTeam;
const addToFaction = async (req, res, next) => {
    const { teamIds, factionId } = req.body;
    try {
        await service.addToFaction(teamIds, factionId);
        (0, responses_1.Ok)(res, { msg: "Team modified" });
    }
    catch (error) {
        (0, responses_1.Error)(res, { error });
    }
};
exports.addToFaction = addToFaction;
const registerTeam = async (req, res, next) => {
    const { name, userIds } = req.body;
    try {
        await service.createTeam(name);
        const id = await service.getTeamId(name);
        if (id) {
            await user_service.addToTeam(userIds, id);
        }
    }
    catch (error) {
        (0, responses_1.Error)(res, { error });
    }
};
exports.registerTeam = registerTeam;
//# sourceMappingURL=team.controller.js.map