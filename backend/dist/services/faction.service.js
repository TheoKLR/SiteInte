"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFaction = exports.deleteFaction = exports.removePoints = exports.addPoints = exports.getPoints = exports.renameFaction = exports.addFaction = exports.getAllFactions = void 0;
const faction_schema_1 = require("../schemas/faction.schema");
const db_1 = require("../database/db");
const drizzle_orm_1 = require("drizzle-orm");
const getAllFactions = async () => {
    return await db_1.db.select().from(faction_schema_1.factionSchema);
};
exports.getAllFactions = getAllFactions;
const addFaction = async (name) => {
    const newFaction = { name, points: 0 };
    return await db_1.db.insert(faction_schema_1.factionSchema).values(newFaction);
};
exports.addFaction = addFaction;
const renameFaction = async (name, id) => {
    return await db_1.db.update(faction_schema_1.factionSchema)
        .set({ name: name })
        .where((0, drizzle_orm_1.eq)(faction_schema_1.factionSchema.id, id));
};
exports.renameFaction = renameFaction;
const getPoints = async (id) => {
    let faction = await db_1.db.select({
        points: faction_schema_1.factionSchema.points
    }).from(faction_schema_1.factionSchema).where((0, drizzle_orm_1.eq)(faction_schema_1.factionSchema.id, id));
    return faction[0]?.points;
};
exports.getPoints = getPoints;
const addPoints = async (id, current, points) => {
    await db_1.db.update(faction_schema_1.factionSchema)
        .set({ points: current + points })
        .where((0, drizzle_orm_1.eq)(faction_schema_1.factionSchema.id, id));
};
exports.addPoints = addPoints;
const removePoints = async (id, current, points) => {
    await db_1.db.update(faction_schema_1.factionSchema)
        .set({ points: current - points })
        .where((0, drizzle_orm_1.eq)(faction_schema_1.factionSchema.id, id));
};
exports.removePoints = removePoints;
const deleteFaction = async (id) => {
    await db_1.db.delete(faction_schema_1.factionSchema).where((0, drizzle_orm_1.eq)(faction_schema_1.factionSchema.id, id));
};
exports.deleteFaction = deleteFaction;
const getFaction = async (id) => {
    await db_1.db.select().from(faction_schema_1.factionSchema).where((0, drizzle_orm_1.eq)(faction_schema_1.factionSchema.id, id));
};
exports.getFaction = getFaction;
//# sourceMappingURL=faction.service.js.map