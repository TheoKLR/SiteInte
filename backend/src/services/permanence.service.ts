import { permanenceSchema, Permanence, userToPermanenceSchema } from "../schemas/permanence.schema";
import { db } from "../database/db";
import { eq } from 'drizzle-orm';

export const getAllPermanences = async () => {
    try {
        return await db.select().from(permanenceSchema);
    } catch (error) {
        throw new Error("Failed to fetch Permanences. Please try again later.");
    }
}

export const getPermanence = async (id: number) => {
    try {
        return await db.select().from(permanenceSchema).where(eq(permanenceSchema.id, id));
    } catch (error) {
        throw new Error("Failed to fetch Permanence. Please try again later.");
    }
}

export const createPermanence = async (
    name: string, 
    desc: string, 
    startingTime: string, 
    duration: number, 
    studentNumber: number
) => {
    try {
        const newPermanence: Permanence = { name, desc, startingTime, duration, studentNumber };
        const result = await db.insert(permanenceSchema).values(newPermanence);
        
        if (!result) {
            throw new Error("Failed to insert new Permanence into the database.");
        }
        return result; 
    } catch (error) {
        throw new Error("Failed to create Permanence. Please try again later."); 
    }
}

export const deletePermanence = async (id: number) => {
    try {
        await removeUsersToPermanence(id)
        await db.delete(permanenceSchema).where(eq(permanenceSchema.id, id));
    } catch (error) {
        throw new Error("Failed to delete Permanence. Please try again later.");
    }
}

export const removeUsersToPermanence = async (id: number) => {
    try {
        await db.delete(userToPermanenceSchema)
            .where(eq(userToPermanenceSchema.permId, id));
    } catch (error) {
        throw new Error("Failed to remove team from faction. Please try again later.");
    }
}