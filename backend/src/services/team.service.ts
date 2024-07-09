import { teamSchema, Team } from "../schemas/team.schema"
import { db } from "../database/db"
import { eq } from 'drizzle-orm'
import { timeEnd, timeStamp } from "console";

export const getAllTeams = async () => {
    try {
        return await db.select().from(teamSchema);
    } catch (error) {
        throw new Error("Failed to fetch teams. Please try again later.");
    }
}

export const createTeam = async (name: string) => {
    try {
        const newTeam: Team = { name, isOfficial: false, faction: null, timeCode: 0};
        return await db.insert(teamSchema).values(newTeam);
    } catch (error) {
        throw new Error("Failed to create team. Please try again later.");
    }
}

export const getTeam = async (id: number) => {
    try {
        const team = await db.select().from(teamSchema).where(eq(teamSchema.id, id));
        return team.length === 0 ? null : team[0];
    } catch (error) {
        throw new Error("Failed to fetch team. Please try again later.");
    }
}

export const getTeamId = async (name: string) => {
    try {
        const teams = await db.select().from(teamSchema).where(eq(teamSchema.name, name));
        return teams.length > 0 ? teams[0].id : null;
    } catch (error) {
        throw new Error("Failed to fetch team ID. Please try again later.");
    }
}

export const deleteTeam = async (id: number) => {
    try {
        await db.delete(teamSchema).where(eq(teamSchema.id, id));
    } catch (error) {
        throw new Error("Failed to delete team. Please try again later.");
    }
}

export const removeTeamFromFaction = async (id: number) => {
    try {
        await db.update(teamSchema)
            .set({ faction: null })
            .where(eq(teamSchema.faction, id));
    } catch (error) {
        throw new Error("Failed to remove team from faction. Please try again later.");
    }
}

export const renameTeam = async (name: string, id: number) => {
    try {
        await db.update(teamSchema)
            .set({ name: name })
            .where(eq(teamSchema.id, id));
    } catch (error) {
        throw new Error("Failed to rename team. Please try again later.");
    }
}

export const addToFaction = async (teamIds: number[], factionId: number) => {
    try {
        for (const id of teamIds) {
            await db.update(teamSchema)
                .set({ faction: factionId })
                .where(eq(teamSchema.id, id));
        }
    } catch (error) {
        throw new Error("Failed to add team to faction. Please try again later.");
    }
}

export const addTimestamp = async (timestamp: number, id: number) => {
    try {
        const currentTimestamp = await getTimestamp(id);

        const currentTimestampValue = currentTimestamp[0]?.timeCode ?? 0;

        if ((currentTimestampValue > timestamp) || (currentTimestampValue===0) ){
            await db.update(teamSchema)
                .set({ timeCode: timestamp })
                .where(eq(teamSchema.id, id));
        }
    } catch (error) {
        throw new Error("Failed to modify the timeCode of the team. Please try again later.");
    }
}

export const getTimestamp = async (id: number) => {
    try {
        const teamTimeCode = await db.select({ timeCode: teamSchema.timeCode })
            .from(teamSchema)
            .where(eq(teamSchema.id, id));

        return teamTimeCode as { timeCode: number | null; }[];
    } catch (error) {
        throw new Error("Failed to get the team's timecode. Please try again later.");
    }
}

export const validateTeam = async (id: number, isOfficial: boolean) => {
    try {
        await db.update(teamSchema)
            .set({isOfficial: isOfficial})
            .where(eq(teamSchema.id, id));
    } catch (error) {
        throw new Error("Failed to get the team's timecode. Please try again later.");
    }
}