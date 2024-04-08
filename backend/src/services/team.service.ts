import { teamSchema, Team } from "../schemas/team.schema"
import { db } from "../database/db"
import { eq } from 'drizzle-orm'

export const getAllTeams = async () => {
    return await db.select().from(teamSchema)
}

export const createTeam = async (name: string) => {
    const newTeam: Team = { name, isOfficial: false, faction: null }
    return await db.insert(teamSchema).values(newTeam)
}

export const getTeam = async (id: number) => {
    const team = await db.select().from(teamSchema).where(eq(teamSchema.id, id))
    if (team.length === 0) return null
    return team[0]
}

export const getTeamId = async (name: string) => {
    const teams = await db.select().from(teamSchema).where(eq(teamSchema.name, name))
    return teams[0].id
}

export const deleteTeam = async (id: number) => {
    await db.delete(teamSchema).where(eq(teamSchema.id, id))
}

export const removeTeamFromFaction = async (id: number) => {
    await db.update(teamSchema)
        .set({ faction: null })
        .where(eq(teamSchema.faction, id))
}

export const renameTeam = async (name: string, id: number) => {
    await db.update(teamSchema)
        .set({ name: name })
        .where(eq(teamSchema.id, id))
}

export const addToFaction = async (teamIds: number[], factionId: number) => {
    for (const id of teamIds) {
        await db.update(teamSchema)
            .set({ faction: factionId })
            .where(eq(teamSchema.id, id))
    }
}