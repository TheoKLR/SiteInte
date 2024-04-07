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
exports.addPoints = exports.deleteFaction = exports.createFaction = exports.getFaction = exports.getAllFactions = void 0;
const service = __importStar(require("../services/faction.service"));
const team_service = __importStar(require("../services/team.service"));
const responses_1 = require("../utils/responses");
const getAllFactions = async (req, res, next) => {
    try {
        const data = await service.getAllFactions();
        (0, responses_1.Ok)(res, { data });
    }
    catch (error) {
        (0, responses_1.Error)(res, { error });
    }
};
exports.getAllFactions = getAllFactions;
const getFaction = async (req, res, next) => {
    const { id } = req.params;
    const idNumber = parseInt(id, 10);
    if (isNaN(idNumber))
        return (0, responses_1.Error)(res, { msg: 'could not parse Id' });
    try {
        const data = await service.getFaction(idNumber);
        (0, responses_1.Ok)(res, { data });
    }
    catch (error) {
        (0, responses_1.Error)(res, { error });
    }
};
exports.getFaction = getFaction;
const createFaction = async (req, res, next) => {
    const { name } = req.body;
    name ?? (0, responses_1.Error)(res, { msg: "No name" });
    try {
        await service.createFaction(name);
        (0, responses_1.Created)(res, {});
    }
    catch (error) {
        (0, responses_1.Error)(res, { error });
    }
};
exports.createFaction = createFaction;
const deleteFaction = async (req, res, next) => {
    const { id } = req.params;
    const idNumber = parseInt(id, 10);
    if (isNaN(idNumber))
        return (0, responses_1.Error)(res, { msg: 'could not parse Id' });
    try {
        await team_service.removeTeamFromFaction(idNumber);
        await service.deleteFaction(idNumber);
        (0, responses_1.Ok)(res, { msg: "Faction deleted" });
    }
    catch (error) {
        (0, responses_1.Error)(res, { error });
    }
};
exports.deleteFaction = deleteFaction;
const addPoints = async (req, res, next) => {
    const { id, points } = req.body;
    try {
        const currentPoints = await service.getPoints(id);
        service.addPoints(id, currentPoints, points);
        (0, responses_1.Ok)(res, { msg: "Faction modified" });
    }
    catch (error) {
        (0, responses_1.Error)(res, { error });
    }
};
exports.addPoints = addPoints;
//# sourceMappingURL=faction.controller.js.map