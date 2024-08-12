import {
    challengeSchema,
    challenge,
    factionTochallengeSchema,
    factionTochallenge,
    ChallengeType, StudentTochallengeSchema
} from "../schemas/challenge.schema"
import {addPoints, removePoints} from "./faction.service"
import { db } from "../database/db"
import {and, eq} from 'drizzle-orm'
import {userSchema} from "../schemas/user.schema";

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

export const getFactionChallenges = async (factionId: number) => {
    try {
        const challs = await db.select().from(factionTochallengeSchema).where(eq(factionTochallengeSchema.factionId, factionId))
        return challs;
    } catch (error) {
        throw new Error("Failed to fetch challenges. Please try again later.");
    }
}

export const createChallenge = async (name: string, description: string, points: string, challType: ChallengeType) => {
    const newChallenge: challenge = {name: name, description: description, points: points, challType: challType};
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

export const validateChallenge = async (challengeId: number, associatedId: number, attributedPoints: number) => {
    //First get the type of challenge
    const challenge = await db.select().from(challengeSchema).where(eq(challengeSchema.id, challengeId));
    if(!challenge || challenge.length === 0) throw new Error("No challenge with id '" + challengeId + "'")
    const challType: ChallengeType = challenge[0].challType
    switch (challType) {
        case ChallengeType.Student:
            //means associatedId is a student
            //checking user exist
            const user = await db.select().from(userSchema).where(eq(userSchema.id, associatedId));
            if(!user || user.length === 0) throw new Error("No user with id '" + associatedId + "'")
            //check user is not CE
            if(user[0].permission === )
            //Associating the challenge to the user
            //checking is event already associated with this user
            const associatedChall = await db.select().from(StudentTochallengeSchema)
                .where(
                    and(
                        eq(StudentTochallengeSchema.challengeId, challengeId),
                        eq(StudentTochallengeSchema.studentId, associatedId)
                    )
                );

            if(associatedChall) throw new Error("Event already associated with this user. userId '" + associatedId + "'")
            //associating the event
            await db.insert(StudentTochallengeSchema).values({
                challengeId: challengeId,
                studentId: associatedId,
                attributedPoints: attributedPoints
            }).execute();
            break;
        case ChallengeType.StudentOrCe:
            break;
        case ChallengeType.Team:
            break;
        case ChallengeType.Faction:
            break;
        case ChallengeType.Free:
            break;
    }
    const newFacToChall: factionTochallenge = { challengeId, factionId: associatedId, attributedPoints};
    const alreadyValidate = await db.select().from(factionTochallengeSchema).where(eq(factionTochallengeSchema, newFacToChall));
    //if(alreadyValidate.length > 0) throw new Error(`Challenge ${challengeId} already validated for team ${factionId}.`)
    if (!alreadyValidate || alreadyValidate.length === 0) {
        await addPoints(associatedId, attributedPoints);
        await db.insert(factionTochallengeSchema).values(newFacToChall);
    }
}

export const unvalidateChallenge = async (challengeId: number, factionId: number) => {
    try {
        const newFacToChall = { challengeId, factionId};
        const alreadyValidate = await db.select()
            .from(factionTochallengeSchema)
            .where(
                and(
                    eq(factionTochallengeSchema.challengeId, challengeId),
                    eq(factionTochallengeSchema.factionId, factionId)
                )
            );
        if (alreadyValidate.length > 0) {
            await removePoints(factionId, alreadyValidate[0].attributedPoints);
            await db.delete(factionTochallengeSchema).where(eq(factionTochallengeSchema, alreadyValidate[0]))
        }
    } catch (error) {
        throw new Error("Failed to create challenge to faction. Please try again later.");
    }
}