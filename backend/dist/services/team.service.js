"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTeamToFaction = exports.renameTeam = exports.deleteTeam = exports.getTeam = exports.addTeam = exports.getAllTeams = void 0;
const team_schema_1 = require("../schemas/team.schema");
const db_1 = require("../database/db");
const drizzle_orm_1 = require("drizzle-orm");
const getAllTeams = async () => {
    return await db_1.db.select().from(team_schema_1.teamSchema);
};
exports.getAllTeams = getAllTeams;
const addTeam = async (name) => {
    const newTeam = { name, faction: null };
    return await db_1.db.insert(team_schema_1.teamSchema).values(newTeam);
};
exports.addTeam = addTeam;
const getTeam = async (id) => {
    await db_1.db.select().from(team_schema_1.teamSchema).where((0, drizzle_orm_1.eq)(team_schema_1.teamSchema.id, id));
};
exports.getTeam = getTeam;
const deleteTeam = async (id) => {
    await db_1.db.delete(team_schema_1.teamSchema).where((0, drizzle_orm_1.eq)(team_schema_1.teamSchema.id, id));
};
exports.deleteTeam = deleteTeam;
const renameTeam = async (name, id) => {
    return await db_1.db.update(team_schema_1.teamSchema)
        .set({ name: name })
        .where((0, drizzle_orm_1.eq)(team_schema_1.teamSchema.id, id));
};
exports.renameTeam = renameTeam;
const addTeamToFaction = async (teamId, factionId) => {
    return await db_1.db.update(team_schema_1.teamSchema)
        .set({ faction: factionId })
        .where((0, drizzle_orm_1.eq)(team_schema_1.teamSchema.id, teamId));
};
exports.addTeamToFaction = addTeamToFaction;
//# sourceMappingURL=team.service.js.map