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
exports.removePoints = exports.addPoints = exports.renameFaction = exports.deleteFaction = exports.addFaction = exports.getFaction = exports.getAllFactions = void 0;
const response_1 = require("../utils/response");
const service = __importStar(require("../services/faction.service"));
const error_1 = require("../utils/error");
const getAllFactions = async (req, res) => {
    try {
        const entities = await service.getAllFactions();
        res.status(response_1.Code.OK).send(new response_1.HttpResponse(response_1.Code.OK, "factions reached", entities));
    }
    catch (error) {
        (0, error_1.serviceError)(res, error);
    }
};
exports.getAllFactions = getAllFactions;
const getFaction = async (req, res) => {
    const { id } = req.params;
    const idNumber = parseInt(id, 10);
    if (isNaN(idNumber)) {
        (0, error_1.fetchingError)(res, "ID format not recognized");
    }
    try {
        const entitie = await service.getFaction(idNumber);
        res.status(response_1.Code.OK).send(new response_1.HttpResponse(response_1.Code.OK, "faction reached", entitie));
    }
    catch (err) {
        (0, error_1.serviceError)(res, err);
    }
};
exports.getFaction = getFaction;
const addFaction = async (req, res) => {
    const { name } = req.params;
    name ?? res.status(response_1.Code.BAD_REQUEST).json(new response_1.HttpResponse(response_1.Code.BAD_REQUEST, "no name"));
    try {
        await service.addFaction(name);
        res.status(response_1.Code.OK).send(new response_1.HttpResponse(response_1.Code.OK, "faction added"));
    }
    catch (err) {
        (0, error_1.serviceError)(res, err);
    }
};
exports.addFaction = addFaction;
const deleteFaction = async (req, res) => {
    const { id } = req.params;
    const idNumber = parseInt(id, 10);
    if (isNaN(idNumber)) {
        (0, error_1.fetchingError)(res, "ID format not recognized");
    }
    try {
        await service.deleteFaction(idNumber);
        res.status(response_1.Code.OK).send(new response_1.HttpResponse(response_1.Code.OK, "faction deleted"));
    }
    catch (err) {
        (0, error_1.serviceError)(res, err);
    }
};
exports.deleteFaction = deleteFaction;
const renameFaction = async (req, res) => {
    const { id, name } = req.params;
    const idNumber = parseInt(id, 10);
    name ?? (0, error_1.fetchingError)(res, "no name");
    if (isNaN(idNumber)) {
        (0, error_1.fetchingError)(res, "ID format not recognized");
    }
    try {
        await service.renameFaction(name, idNumber);
        res.status(response_1.Code.OK).send(new response_1.HttpResponse(response_1.Code.OK, "faction renamed"));
    }
    catch (err) {
        (0, error_1.serviceError)(res, err);
    }
};
exports.renameFaction = renameFaction;
const addPoints = async (req, res) => {
    const { id, points } = req.params;
    const idNumber = parseInt(id, 10);
    const pointsNumber = parseInt(points, 10);
    if (isNaN(idNumber)) {
        (0, error_1.fetchingError)(res, "ID format not recognized");
    }
    if (isNaN(pointsNumber)) {
        (0, error_1.fetchingError)(res, "points format not recognized");
    }
    try {
        const currentPoints = await service.getPoints(idNumber);
        service.addPoints(idNumber, currentPoints, pointsNumber);
        res.status(response_1.Code.OK).send(new response_1.HttpResponse(response_1.Code.OK, "faction modified"));
    }
    catch (err) {
        (0, error_1.serviceError)(res, err);
    }
};
exports.addPoints = addPoints;
const removePoints = async (req, res) => {
    const { id, points } = req.params;
    const idNumber = parseInt(id, 10);
    const pointsNumber = parseInt(points, 10);
    if (isNaN(idNumber)) {
        (0, error_1.fetchingError)(res, "ID format not recognized");
    }
    if (isNaN(pointsNumber)) {
        (0, error_1.fetchingError)(res, "points format not recognized");
    }
    try {
        const currentPoints = await service.getPoints(idNumber);
        service.removePoints(idNumber, currentPoints, pointsNumber);
        res.status(response_1.Code.OK).send(new response_1.HttpResponse(response_1.Code.OK, "faction modified"));
    }
    catch (err) {
        (0, error_1.serviceError)(res, err);
    }
};
exports.removePoints = removePoints;
//# sourceMappingURL=faction.controller.js.map