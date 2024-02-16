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
exports.addStudentToTeam = exports.deleteStudent = exports.addStudent = exports.getStudent = exports.getAllStudents = void 0;
const response_1 = require("../utils/response");
const service = __importStar(require("../services/student.service"));
const error_1 = require("../utils/error");
const getAllStudents = async (req, res) => {
    try {
        const entities = await service.getAllStudents();
        res.status(response_1.Code.OK).send(new response_1.HttpResponse(response_1.Code.OK, "Students reached", entities));
    }
    catch (error) {
        (0, error_1.serviceError)(res, error);
    }
};
exports.getAllStudents = getAllStudents;
const getStudent = async (req, res) => {
    const { id } = req.params;
    const idNumber = parseInt(id, 10);
    if (isNaN(idNumber)) {
        (0, error_1.fetchingError)(res, "ID format not recognized");
    }
    try {
        const entitie = await service.getStudent(idNumber);
        res.status(response_1.Code.OK).send(new response_1.HttpResponse(response_1.Code.OK, "Student reached", entitie));
    }
    catch (err) {
        (0, error_1.serviceError)(res, err);
    }
};
exports.getStudent = getStudent;
const addStudent = async (req, res) => {
    const { first_name, last_name, email, password } = req.params;
    first_name ?? res.status(response_1.Code.BAD_REQUEST).json(new response_1.HttpResponse(response_1.Code.BAD_REQUEST, "first name missing"));
    last_name ?? res.status(response_1.Code.BAD_REQUEST).json(new response_1.HttpResponse(response_1.Code.BAD_REQUEST, "last name missing"));
    email ?? res.status(response_1.Code.BAD_REQUEST).json(new response_1.HttpResponse(response_1.Code.BAD_REQUEST, "email missing"));
    password ?? res.status(response_1.Code.BAD_REQUEST).json(new response_1.HttpResponse(response_1.Code.BAD_REQUEST, "password missing"));
    try {
        await service.addStudent(first_name, last_name, email, password);
        res.status(response_1.Code.OK).send(new response_1.HttpResponse(response_1.Code.OK, "Student added"));
    }
    catch (err) {
        (0, error_1.serviceError)(res, err);
    }
};
exports.addStudent = addStudent;
const deleteStudent = async (req, res) => {
    const { id } = req.params;
    const idNumber = parseInt(id, 10);
    if (isNaN(idNumber)) {
        (0, error_1.fetchingError)(res, "ID format not recognized");
    }
    try {
        await service.deleteStudent(idNumber);
        res.status(response_1.Code.OK).send(new response_1.HttpResponse(response_1.Code.OK, "Student deleted"));
    }
    catch (err) {
        (0, error_1.serviceError)(res, err);
    }
};
exports.deleteStudent = deleteStudent;
const addStudentToTeam = async (req, res) => {
    const { StudentId, teamId } = req.params;
    const StudentIdNumber = parseInt(StudentId, 10);
    const teamIdNumber = parseInt(teamId, 10);
    if (isNaN(StudentIdNumber)) {
        (0, error_1.fetchingError)(res, "ID format not recognized");
    }
    if (isNaN(teamIdNumber)) {
        (0, error_1.fetchingError)(res, "ID format not recognized");
    }
    try {
        await service.addStudentToTeam(StudentIdNumber, teamIdNumber);
        res.status(response_1.Code.OK).send(new response_1.HttpResponse(response_1.Code.OK, "Student modified"));
    }
    catch (err) {
        (0, error_1.serviceError)(res, err);
    }
};
exports.addStudentToTeam = addStudentToTeam;
//# sourceMappingURL=student.controller.js.map