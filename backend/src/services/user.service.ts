import { userSchema, User, RoleType } from "../schemas/user.schema";
import { db } from "../database/db";
import { eq } from 'drizzle-orm';

export const getAllUsers = async () => {
    return await db.select().from(userSchema);
}

export const getUser = async (id: number) => {
    return await db.select().from(userSchema).where(eq(userSchema.id, id));
}

export const getUserByEmail = async (email: string) => {
    return await db.select().from(userSchema).where(eq(userSchema.email, email));
}

export const createUser = async (first_name: string, last_name: string, email: string, password: string, role: RoleType) => {
    const newUser: User = { first_name, last_name, email, password, role, team: null };
    return await db.insert(userSchema).values(newUser)
}


export const deleteUser = async (id: number) => {
    return await db.delete(userSchema).where(eq(userSchema.id, id));
}

export const addToTeam = async (UserId: number, TeamId: number) => {
    return await db.update(userSchema)
        .set({ team: TeamId })
        .where(eq(userSchema.id, UserId));
}

export const getRole = async (id: number) => {
    return await db.select({role: userSchema.role}).from(userSchema).where(eq(userSchema.id, id));
}

export const grantUser = async (id: number) => {
    return await db.update(userSchema)
        .set({ role: RoleType.Admin })
        .where(eq(userSchema.id, id));
}

export const revokeUser = async (id: number) => {
    return await db.update(userSchema)
        .set({ role: RoleType.Student })
        .where(eq(userSchema.id, id));
}