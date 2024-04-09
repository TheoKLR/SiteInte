import { factionSchema, Faction } from "../schemas/faction.schema";
import { db } from "../database/db";
import { eq } from 'drizzle-orm';

export const getAllFactions = async () => {
    try {
        return await db.select().from(factionSchema);
    } catch (error) {
        throw new Error("Failed to fetch factions. Please try again later.");
    }
}

export const getFaction = async (id: number) => {
    try {
        return await db.select().from(factionSchema).where(eq(factionSchema.id, id));
    } catch (error) {
        throw new Error("Failed to fetch faction. Please try again later.");
    }
}

export const createFaction = async (name: string) => {
    try {
        const newFaction: Faction = { name, points: 0 };
        const result = await db.insert(factionSchema).values(newFaction);
        
        if (!result) {
            throw new Error("Failed to insert new faction into the database.");
        }
        
        return result; // Assuming result contains some useful information about the insertion, adjust as needed
    } catch (error) {
        throw new Error("Failed to create faction. Please try again later."); // Throw a more descriptive error message
    }
}

export const deleteFaction = async (id: number) => {
    try {
        await db.delete(factionSchema).where(eq(factionSchema.id, id));
    } catch (error) {
        throw new Error("Failed to delete faction. Please try again later.");
    }
}

export const getPoints = async (id: number) => {
    try {
        let faction = await db.select({
            points: factionSchema.points
        }).from(factionSchema).where(eq(factionSchema.id, id));
        return faction[0]?.points;
    } catch (error) {
        throw new Error("Failed to fetch points. Please try again later.");
    }
}

export const addPoints = async (id: number, current: number, points: number) => {
    try {
        await db.update(factionSchema)
            .set({ points: current + points })
            .where(eq(factionSchema.id, id));
    } catch (error) {
        throw new Error("Failed to add points. Please try again later.");
    }
}
