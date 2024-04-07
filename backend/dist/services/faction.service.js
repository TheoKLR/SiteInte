"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPoints = exports.getPoints = exports.deleteFaction = exports.createFaction = exports.getFaction = exports.getAllFactions = void 0;
const faction_schema_1 = require("../schemas/faction.schema");
const db_1 = require("../database/db");
const drizzle_orm_1 = require("drizzle-orm");
const getAllFactions = async () => {
    try {
        return await db_1.db.select().from(faction_schema_1.factionSchema);
    }
    catch (error) {
        throw new Error("Failed to fetch factions. Please try again later.");
    }
};
exports.getAllFactions = getAllFactions;
const getFaction = async (id) => {
    try {
        return await db_1.db.select().from(faction_schema_1.factionSchema).where((0, drizzle_orm_1.eq)(faction_schema_1.factionSchema.id, id));
    }
    catch (error) {
        throw new Error("Failed to fetch faction. Please try again later.");
    }
};
exports.getFaction = getFaction;
const createFaction = async (name) => {
    try {
        const newFaction = { name, points: 0 };
        const result = await db_1.db.insert(faction_schema_1.factionSchema).values(newFaction);
        if (!result) {
            throw new Error("Failed to insert new faction into the database.");
        }
        return result; // Assuming result contains some useful information about the insertion, adjust as needed
    }
    catch (error) {
        throw new Error("Failed to create faction. Please try again later."); // Throw a more descriptive error message
    }
};
exports.createFaction = createFaction;
const deleteFaction = async (id) => {
    try {
        await db_1.db.delete(faction_schema_1.factionSchema).where((0, drizzle_orm_1.eq)(faction_schema_1.factionSchema.id, id));
    }
    catch (error) {
        throw new Error("Failed to delete faction. Please try again later.");
    }
};
exports.deleteFaction = deleteFaction;
const getPoints = async (id) => {
    try {
        let faction = await db_1.db.select({
            points: faction_schema_1.factionSchema.points
        }).from(faction_schema_1.factionSchema).where((0, drizzle_orm_1.eq)(faction_schema_1.factionSchema.id, id));
        return faction[0]?.points;
    }
    catch (error) {
        throw new Error("Failed to fetch points. Please try again later.");
    }
};
exports.getPoints = getPoints;
const addPoints = async (id, current, points) => {
    try {
        await db_1.db.update(faction_schema_1.factionSchema)
            .set({ points: current + points })
            .where((0, drizzle_orm_1.eq)(faction_schema_1.factionSchema.id, id));
    }
    catch (error) {
        throw new Error("Failed to add points. Please try again later.");
    }
};
exports.addPoints = addPoints;
//# sourceMappingURL=faction.service.js.map