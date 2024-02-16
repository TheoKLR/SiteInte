"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addStudentToTeam = exports.deleteStudent = exports.getStudent = exports.addStudent = exports.getAllStudents = void 0;
const student_schema_1 = require("../schemas/student.schema");
const db_1 = require("../database/db");
const drizzle_orm_1 = require("drizzle-orm");
const getAllStudents = async () => {
    return await db_1.db.select().from(student_schema_1.studentSchema);
};
exports.getAllStudents = getAllStudents;
const addStudent = async (first_name, last_name, email, password) => {
    const newStudent = { first_name, last_name, email, password, role: null, team: null };
    return await db_1.db.insert(student_schema_1.studentSchema).values(newStudent);
};
exports.addStudent = addStudent;
const getStudent = async (id) => {
    await db_1.db.select().from(student_schema_1.studentSchema).where((0, drizzle_orm_1.eq)(student_schema_1.studentSchema.id, id));
};
exports.getStudent = getStudent;
const deleteStudent = async (id) => {
    await db_1.db.delete(student_schema_1.studentSchema).where((0, drizzle_orm_1.eq)(student_schema_1.studentSchema.id, id));
};
exports.deleteStudent = deleteStudent;
const addStudentToTeam = async (StudentId, TeamId) => {
    return await db_1.db.update(student_schema_1.studentSchema)
        .set({ team: TeamId })
        .where((0, drizzle_orm_1.eq)(student_schema_1.studentSchema.id, StudentId));
};
exports.addStudentToTeam = addStudentToTeam;
//# sourceMappingURL=student.service.js.map