import {
    challengeSchema,
    challenge,
    factionTochallengeSchema,
    factionTochallenge,
    ChallengeType, StudentTochallengeSchema, TeamTochallengeSchema, freeToChallenge, FreeToChallengeSchema
} from "../schemas/challenge.schema"
import {addPoints, removePoints} from "./faction.service"
import { db } from "../database/db"
import {and, eq} from 'drizzle-orm'
import {PermType, userSchema} from "../schemas/user.schema";
import {teamSchema} from "../schemas/team.schema";
import {factionSchema} from "../schemas/faction.schema";
import assert from "node:assert";
import {getFactionFromUserId, getFactionFromUserTeam} from "../utils/challenge";


export const getAllChallenges = async () => {
    try {
        return await db.select().from(challengeSchema);
    } catch (error) {
        throw new Error("Failed to fetch challenges. Please try again later.");
    }
}

export const getAllFactionChallenges = async () => {
    try {
        return await db.select().from(challengeSchema).where(eq(challengeSchema.challType, ChallengeType.Faction));
    } catch (error) {
        throw new Error("Failed to fetch challenges. Please try again later.");
    }
}

export const getAllStudentOrCeChallenges = async () => {
    try {
        return await db.select().from(challengeSchema).where(eq(challengeSchema.challType, ChallengeType.StudentOrCe));
    } catch (error) {
        throw new Error("Failed to fetch challenges. Please try again later.");
    }
}

export const getAllTeamChallenges = async () => {
    try {
        return await db.select().from(challengeSchema).where(eq(challengeSchema.challType, ChallengeType.Team));
    } catch (error) {
        throw new Error("Failed to fetch challenges. Please try again later.");
    }
}

export const getAllStudentChallenges = async () => {
    try {
        return await db.select().from(challengeSchema).where(eq(challengeSchema.challType, ChallengeType.Student));
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

export const countPoints = async (factionId: number): Promise<number> => {
    //checking faction exist
    const faction = await db.select().from(factionSchema).where(eq(factionSchema.id, factionId));
    if(!faction || faction.length === 0) throw new Error("No faction with id '" + faction + "'")

    let points = 0;

    //getting every challenge associated with faction
    const factionChallenges = await db.select().from(factionTochallengeSchema).where(eq(factionTochallengeSchema.factionId, factionId))
    factionChallenges.forEach(challenge => points += challenge.attributedPoints)

    //getting every teamId who is associated with factionId
    const factionTeams = await db.select().from(teamSchema).where(eq(teamSchema.faction, factionId))
    const teamsId = factionTeams.map(team => team.id)

    //getting every challenge associated with every teams and add points
    //also getting every user associated with teamId
    for (const teamId of teamsId) {
        const challenges = await db.select().from(TeamTochallengeSchema).where(eq(TeamTochallengeSchema.teamId, teamId));
        challenges.forEach(challenge => points += challenge.attributedPoints)
        //-----//
        const users = await db.select().from(userSchema).where(eq(userSchema.team, teamId));
        //getting challenges associated to users
        for(let user of users) {
            const userChallenges = await db.select().from(StudentTochallengeSchema).where(eq(StudentTochallengeSchema.studentId, user.id))
            userChallenges.forEach(challenge => points += challenge.attributedPoints)
        }
    }

    return points
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

export const validateChallenge = async (challengeId: number, associatedId: number, attributedPoints: number, text: string | null) => {
    console.log("Cc")
    //First get the type of challenge
    const challenge = await db.select().from(challengeSchema).where(eq(challengeSchema.id, challengeId));
    if(!challenge || challenge.length === 0) throw new Error("No challenge with id '" + challengeId + "'")
    const challType: ChallengeType = challenge[0].challType
    switch (challType) {
        case ChallengeType.Student:
            await completeChallengeToUser(challengeId, associatedId, attributedPoints, false)
            break;
        case ChallengeType.StudentOrCe:
            await completeChallengeToUser(challengeId, associatedId, attributedPoints, true)
            break;
        case ChallengeType.Team:
            await completeChallengeToTeam(challengeId, associatedId, attributedPoints)
            break;
        case ChallengeType.Faction:
            await completeChallengeToFaction(challengeId, associatedId, attributedPoints)
            break;
        case ChallengeType.Free:
            if(!text) throw new Error("You need to explain why you add points.")
            await freeChallengeToFaction(associatedId, attributedPoints, text)
            break;
    }
}


//TODO
export const unvalidateChallenge = async (challengeId: number, associatedId: number) => {
    //First get the type of challenge
    const challenge = await db.select().from(challengeSchema).where(eq(challengeSchema.id, challengeId));
    if(!challenge || challenge.length === 0) throw new Error("No challenge with id '" + challengeId + "'")
    const challType: ChallengeType = challenge[0].challType
    switch (challType) {
        case ChallengeType.Student:
            await unvalidateChallengeToUser(challengeId, associatedId)
            break;
        case ChallengeType.StudentOrCe:
            await unvalidateChallengeToUser(challengeId, associatedId)
            break;
        case ChallengeType.Team:
            await unvalidateChallengeToTeam(challengeId, associatedId)
            break;
        case ChallengeType.Faction:
            await unvalidateChallengeToFaction(challengeId, associatedId)
            break;
        case ChallengeType.Free:
            await unvalidateToFaction(associatedId)
            break;
    }
}

async function unvalidateChallengeToUser(challengeId: number, associatedId: number) {
    //Getting the challenge
    const associatedChall = await db.select().from(StudentTochallengeSchema)
        .where(
            and(
                eq(StudentTochallengeSchema.challengeId, challengeId),
                eq(StudentTochallengeSchema.studentId, associatedId)
            )
        );
    if(associatedChall.length === 0) throw new Error("Event already associated with this user. userId '" + associatedId + "'")
    const points = associatedChall[0].attributedPoints
    //Getting faction
    const faction = await getFactionFromUserId(associatedId)
    await removePoints(faction, points)
}

async function completeChallengeToUser(challengeId: number, associatedId: number, attributedPoints: number, allowCe: boolean) {
    //means associatedId is a student
    //checking user exist
    const user = await db.select().from(userSchema).where(eq(userSchema.id, associatedId));
    if(!user || user.length === 0) throw new Error("No user with id '" + associatedId + "'")
    //check user is not CE
    if(!allowCe) {
        if(user[0].permission === PermType.Student && user[0].team !== null) throw new Error("User is 'CE' he can not complete this challenge.")
    }
    //Associating the challenge to the user
    //checking is event already associated with this user
    const associatedChall = await db.select().from(StudentTochallengeSchema)
        .where(
            and(
                eq(StudentTochallengeSchema.challengeId, challengeId),
                eq(StudentTochallengeSchema.studentId, associatedId)
            )
        );

    if(associatedChall && associatedChall.length > 0) throw new Error("Event already associated with this user. userId '" + associatedId + "'")
    //associating the event
    await db.insert(StudentTochallengeSchema).values({
        challengeId: challengeId,
        studentId: associatedId,
        attributedPoints: attributedPoints
    }).execute();

    //get associated faction
    const faction = await getFactionFromUserTeam(user[0].team as number)
    await addPoints(faction, attributedPoints)
}

async function completeChallengeToTeam(challengeId: number, associatedId: number, attributedPoints: number) {
    //means associatedId is a team
    //checking team exist
    const team = await db.select().from(teamSchema).where(eq(teamSchema.id, associatedId));
    if(!team || team.length === 0) throw new Error("No team with id '" + associatedId + "'")
    //Associating the challenge to the team
    //checking is event already associated with this team
    const associatedChall = await db.select().from(TeamTochallengeSchema)
        .where(
            and(
                eq(TeamTochallengeSchema.challengeId, challengeId),
                eq(TeamTochallengeSchema.teamId, associatedId)
            )
        );

    if(associatedChall && associatedChall.length > 0) throw new Error("Event already associated with this team. teamId '" + associatedId + "'")
    //associating the event
    await db.insert(TeamTochallengeSchema).values({
        challengeId: challengeId,
        teamId: associatedId,
        attributedPoints: attributedPoints
    }).execute();

    //adding points to the faction also
    await addPoints(team[0].faction as number, attributedPoints)
}

async function completeChallengeToFaction(challengeId: number, associatedId: number, attributedPoints: number) {
    //means associatedId is a faction
    //checking faction exist
    const faction = await db.select().from(factionSchema).where(eq(factionSchema.id, associatedId));
    if(!faction || faction.length === 0) throw new Error("No faction with id '" + associatedId + "'")
    //Associating the challenge to the faction
    //checking is event already associated with this faction
    const associatedChall = await db.select().from(factionTochallengeSchema)
        .where(
            and(
                eq(factionTochallengeSchema.challengeId, challengeId),
                eq(factionTochallengeSchema.factionId, associatedId)
            )
        );
    console.log(associatedChall)
    if(associatedChall && associatedChall.length > 0) throw new Error("Event already associated with this faction. teamId '" + associatedId + "'")
    //associating the event
    await db.insert(factionTochallengeSchema).values({
        challengeId: challengeId,
        factionId: associatedId,
        attributedPoints: attributedPoints
    }).execute();

    //adding points to the faction also
    await addPoints(faction[0].id, attributedPoints)
}

async function freeChallengeToFaction(factionId: number, attributedPoints: number, text: string) {
    //means associatedId is a faction
    //checking faction exist
    const faction = await db.select().from(factionSchema).where(eq(factionSchema.id, factionId));
    if(!faction || faction.length === 0) throw new Error("No faction with id '" + faction + "'")

    //associating the event
    await db.insert(FreeToChallengeSchema).values({
        factionId: factionId,
        text: text,
        attributedPoints: attributedPoints
    }).execute();

    //adding points to the faction also
    await addPoints(faction[0].id, attributedPoints)
}