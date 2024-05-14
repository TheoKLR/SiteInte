import { challengeSchema, challenge, factionTochallengeSchema, factionTochallenge } from "../schemas/challenge.schema"
import { addPoints } from "./faction.service"
import { db } from "../database/db"
import { eq } from 'drizzle-orm'

export const getAllChallenges = async () => {
    try {
        return await db.select().from(challengeSchema);
    } catch (error) {
        throw new Error("Failed to fetch challenges. Please try again later.");
    }
}

export const getChallenge = async (id: number) => {
    try {
        const chall = await db.select().from(challengeSchema).where(eq(challengeSchema.id, id))
        return chall[0];
    } catch (error) {
        throw new Error("Failed to fetch challenge. Please try again later.");
    }
}

export const createChallenge = async (name: string, description: string, points: number) => {
    const newChallenge: challenge = { name, description, points};
    try {
        await db.insert(challengeSchema).values(newChallenge);
    } catch (error) {
        throw new Error("Failed to create challenge. Please try again later.");
    }
}

export const deleteChallenge = async (id: number) => {
    try {
        await db.delete(factionTochallengeSchema).where(eq(factionTochallengeSchema.challengeId, id))
        await db.delete(challengeSchema).where(eq(challengeSchema.id, id));
    } catch (error) {
        throw new Error("Failed to delete challenge. Please try again later.");
    }
}

export const validateChallenge = async (challengeId: number, factionId: number) => {
    try {
        const newFacToChall: factionTochallenge = { challengeId, factionId};
        const alreadyValidate = await db.select().from(factionTochallengeSchema).where(eq(factionTochallengeSchema, newFacToChall));
        if (alreadyValidate.length === 0) {
            const points = (await getChallenge(challengeId)).points;
            addPoints(factionId, points);
            await db.insert(factionTochallengeSchema).values(newFacToChall);
        }
    } catch (error) {
        throw new Error("Failed to create challenge to faction. Please try again later.");
    }
}