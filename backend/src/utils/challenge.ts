import {db} from "../database/db";
import {teamSchema} from "../schemas/team.schema";
import {eq, inArray, ne} from "drizzle-orm";
import {User, userSchema} from "../schemas/user.schema";
import {NoFaction, NoTeam, NoTeamForUser, NoUser} from "../error/user";
import {factionSchema} from "../schemas/faction.schema";
import {
    challenge,
    challengeSchema,
    ChallengeType, factionTochallenge, factionTochallengeSchema, studentTochallenge,
    StudentTochallengeSchema,
    teamTochallenge, TeamTochallengeSchema
} from "../schemas/challenge.schema";

import {isCe} from "../services/user.service";

export async function getFactionFromTeam(userTeam: number): Promise<number> {
    //get associated faction
    const team = await db.select().from(teamSchema).where(eq(teamSchema.id, userTeam))
    if(!team || team.length === 0) throw NoTeam(userTeam)
    return team[0].faction as number
}

export async function getFactionFromUserId(userId: number): Promise<number> {
    //get user
    const user = await db.select().from(userSchema).where(eq(userSchema.id, userId))
    if(!user || user.length === 0) throw NoUser(userId)
    //get associated faction
    const team = await db.select().from(teamSchema).where(eq(teamSchema.id, user[0].team as number))
    if(!team || team.length === 0) throw NoTeam(user[0].team)
    return team[0].faction as number
}

export async function getFactionFromUser(user: User): Promise<number> {
    //get associated faction
    const team = await db.select().from(teamSchema).where(eq(teamSchema.id, user.team as number))
    if(!team || team.length === 0) throw NoTeam(team[0].id)
    return team[0].faction as number
}

export async function getChallengeFromIds(challengesIds: number[]): Promise<challenge[]> {
    if(!challengesIds || challengesIds.length === 0) return []
    return db.select()
        .from(challengeSchema)
        .where(inArray(challengeSchema.id, challengesIds));
}

export async function getAllChallenges(): Promise<challenge[]> {
    return db.select().from(challengeSchema)
}

export async function getChallengesOf(type: ChallengeType): Promise<challenge[]> {
    return db.select().from(challengeSchema).where(eq(challengeSchema.challType, type))
}

export async function getAllChallengesExcept(type: ChallengeType): Promise<challenge[]> {
    return db.select().from(challengeSchema).where(ne(challengeSchema.challType, type))
}

export async function getTeamAndFactionFromUser(user: User): Promise<{teamId: number, factionId: number}> {
    //get associated faction
    const team = await db.select().from(teamSchema).where(eq(teamSchema.id, user.team as number))
    if(!team || team.length === 0) throw NoTeam(team[0].id)
    //get faction
    const faction = await db.select().from(factionSchema).where(eq(factionSchema.id, team[0].faction as number))
    if(!faction || faction.length === 0) throw NoFaction(team[0].faction)
    return {teamId: team[0].id, factionId: faction[0].id}
}

//for WEI attribution
export async function getGiIdFromUser(user: User): Promise<string | null> {
    //get associated faction
    const team = await db.select().from(teamSchema).where(eq(teamSchema.id, user.team as number))
    if(!team || team.length === 0) {
        console.log("No team for user '" + user.email + "'")
        return null
    }
    //get faction
    return team[0].gi_id
}

export async function getTeamAndFactionFromUserId(user: number): Promise<{teamId: number, factionId: number}> {
    //get user
    const userdb = await db.select().from(userSchema).where(eq(userSchema.id, user))
    if(!userdb || userdb.length === 0) throw NoUser(user)
    return await getTeamAndFactionFromUser(userdb[0])
}

export async function isCE(studentId: number): Promise<boolean> {
    //get user
    const userdb = await db.select().from(userSchema).where(eq(userSchema.id, studentId))
    if(!userdb || userdb.length === 0) throw NoUser(studentId)
    return isCe(userdb[0])
}