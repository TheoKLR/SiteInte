
import { userSchema, User, PermType } from '../schemas/user.schema';
import { db } from "../database/db"
import { eq, and } from 'drizzle-orm'

export const getAllUsers = async () => {
    return await db.select({
        id: userSchema.id,
        first_name: userSchema.first_name,
        last_name: userSchema.last_name,
        email: userSchema.email,
        permission: userSchema.permission,
        team_id: userSchema.team,
    }).from(userSchema)
}

export const getUser = async (id: number) => {
    const user = await db.select({
        id: userSchema.id,
        first_name: userSchema.first_name,
        last_name: userSchema.id,
        email: userSchema.email,
        team_id: userSchema.team,
    }).from(userSchema).where(eq(userSchema.id, id))

    if (user.length === 0) return null
    return user[0]
}

export const getNewStudentByEmail = async (email: string) => {
    const user = await db.select().from(userSchema).where(
        and(
            eq(userSchema.email, email),
            eq(userSchema.permission, PermType.NewStudent)
        )
    )
    if (user.length === 0) return null
    return user[0]
}

export const getUserByEmail = async (email: string) => {
    const user = await db.select().from(userSchema).where(eq(userSchema.email, email))

    if (user.length === 0) return null
    return user[0]
}


export const createUser = async (first_name: string, last_name: string, email: string, password: string, permission: PermType) => {
    const allUser = await getAllUsers()
    if (allUser.length === 0) permission = PermType.Admin

    const newUser: User = { first_name, last_name, email, contact: null, permission, password, team: null }
    await db.insert(userSchema).values(newUser)
}


export const deleteUser = async (id: number) => {
    await db.delete(userSchema).where(eq(userSchema.id, id))
}

export const addToTeam = async (UserIds: number[], TeamId: number) => {
    for (const id of UserIds) {
        await db.update(userSchema)
            .set({ team: TeamId })
            .where(eq(userSchema.id, id));
    }
}

export const addContact = async (id: number, contact: string) => {
    await db.update(userSchema)
        .set({ contact: contact })
        .where(eq(userSchema.id, id))
}
/*
export const getRole = async (id: number) => {
    return await db.select({ role: userSchema.role }).from(userSchema).where(eq(userSchema.id, id))
}

export const getUserDesires = async (id: number) => {
    return db.select({ desires: desireSchema })
        .from(userToDesireSchema)
        .rightJoin(desireSchema, eq(userToDesireSchema.desireId, desireSchema.id))
        .leftJoin(userSchema, eq(userToDesireSchema.userId, userSchema.id))
        .where(eq(userSchema.id, id))
}*/