import {db} from "../database/db";
import {teamSchema} from "../schemas/team.schema";
import {eq} from "drizzle-orm";
import {userSchema} from "../schemas/user.schema";

export async function getFactionFromUserTeam(userTeam: number): Promise<number> {
    //get associated faction
    const team = await db.select().from(teamSchema).where(eq(teamSchema.id, userTeam))
    if(!team || team.length === 0) throw new Error('No team with id ' + userTeam)
    return team[0].faction as number
}

export async function getFactionFromUserId(userId: number): Promise<number> {
    //get user
    const user = await db.select().from(userSchema).where(eq(userSchema.id, userId))
    if(!user || user.length === 0) throw new Error("No user with id '" + userId + "'")
    //get associated faction
    const team = await db.select().from(teamSchema).where(eq(teamSchema.id, user[0].team as number))
    if(!team || team.length === 0) throw new Error('No team with id ' + user[0].team)
    return team[0].faction as number
}