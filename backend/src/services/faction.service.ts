import { factionSchema, Faction } from "../schemas/faction.schema";
import { db } from "../database/db";
import { eq } from 'drizzle-orm';

export const getAllFactions = async () => {
    return await db.select().from(factionSchema);
}

export const getFaction = async (id: number) => {
    return await db.select().from(factionSchema).where(eq(factionSchema.id, id));
}

export const createFaction = async (name: string) => {
    const newFaction: Faction = { name, points: 0 };
    return await db.insert(factionSchema).values(newFaction)
}

export const deleteFaction = async (id: number) => {
    await db.delete(factionSchema).where(eq(factionSchema.id, id));
}

export const getPoints = async (id: number) => {
    let faction = await db.select({
        points: factionSchema.points
    }).from(factionSchema).where(eq(factionSchema.id, id));
    return faction[0]?.points;
}

export const addPoints = async (id: number, current: number, points: number) => {
    await db.update(factionSchema)
        .set({ points: current + points })
        .where(eq(factionSchema.id, id));
}

