"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToFaction = exports.renameTeam = exports.removeTeamFromFaction = exports.deleteTeam = exports.getTeamId = exports.getTeam = exports.createTeam = exports.getAllTeams = void 0;
const team_schema_1 = require("../schemas/team.schema");
const db_1 = require("../database/db");
const drizzle_orm_1 = require("drizzle-orm");
const getAllTeams = async () => {
    try {
        return await db_1.db.select().from(team_schema_1.teamSchema);
    }
    catch (error) {
        throw new Error("Failed to fetch teams. Please try again later.");
    }
};
exports.getAllTeams = getAllTeams;
const createTeam = async (name) => {
    try {
        const newTeam = { name, isOfficial: false, faction: null };
        return await db_1.db.insert(team_schema_1.teamSchema).values(newTeam);
    }
    catch (error) {
        throw new Error("Failed to create team. Please try again later.");
    }
};
exports.createTeam = createTeam;
const getTeam = async (id) => {
    try {
        const team = await db_1.db.select().from(team_schema_1.teamSchema).where((0, drizzle_orm_1.eq)(team_schema_1.teamSchema.id, id));
        return team.length === 0 ? null : team[0];
    }
    catch (error) {
        throw new Error("Failed to fetch team. Please try again later.");
    }
};
exports.getTeam = getTeam;
const getTeamId = async (name) => {
    try {
        const teams = await db_1.db.select().from(team_schema_1.teamSchema).where((0, drizzle_orm_1.eq)(team_schema_1.teamSchema.name, name));
        return teams.length > 0 ? teams[0].id : null;
    }
    catch (error) {
        throw new Error("Failed to fetch team ID. Please try again later.");
    }
};
exports.getTeamId = getTeamId;
const deleteTeam = async (id) => {
    try {
        await db_1.db.delete(team_schema_1.teamSchema).where((0, drizzle_orm_1.eq)(team_schema_1.teamSchema.id, id));
    }
    catch (error) {
        throw new Error("Failed to delete team. Please try again later.");
    }
};
exports.deleteTeam = deleteTeam;
const removeTeamFromFaction = async (id) => {
    try {
        await db_1.db.update(team_schema_1.teamSchema)
            .set({ faction: null })
            .where((0, drizzle_orm_1.eq)(team_schema_1.teamSchema.faction, id));
    }
    catch (error) {
        throw new Error("Failed to remove team from faction. Please try again later.");
    }
};
exports.removeTeamFromFaction = removeTeamFromFaction;
const renameTeam = async (name, id) => {
    try {
        await db_1.db.update(team_schema_1.teamSchema)
            .set({ name: name })
            .where((0, drizzle_orm_1.eq)(team_schema_1.teamSchema.id, id));
    }
    catch (error) {
        throw new Error("Failed to rename team. Please try again later.");
    }
};
exports.renameTeam = renameTeam;
const addToFaction = async (teamIds, factionId) => {
    try {
        for (const id of teamIds) {
            await db_1.db.update(team_schema_1.teamSchema)
                .set({ faction: factionId })
                .where((0, drizzle_orm_1.eq)(team_schema_1.teamSchema.id, id));
        }
    }
    catch (error) {
        throw new Error("Failed to add team to faction. Please try again later.");
    }
};
exports.addToFaction = addToFaction;
//# sourceMappingURL=team.service.js.map