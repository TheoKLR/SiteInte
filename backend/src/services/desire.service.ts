import { desireSchema, Desire, userToDesireSchema, userToDesire } from "../schemas/desire.schema";
import { userSchema } from "../schemas/user.schema";
import { db } from "../database/db";
import { eq } from 'drizzle-orm';

export const getAllDesires = async () => {
    return await db.select().from(desireSchema);
}

export const getDesire = async (id: number) => {
    const desire = await db.select().from(desireSchema).where(eq(desireSchema.id, id));
    return desire[0];
}

export const createDesire = async (name: string, description: string) => {
    const newDesire: Desire = { name, description };
    return await db.insert(desireSchema).values(newDesire)
}

export const deleteDesire = async (id: number) => {
    await db.delete(desireSchema).where(eq(desireSchema.id, id));
}

export const deleteUserDesires = async (id: number) => {
    await db.delete(userToDesireSchema).where(eq(userToDesireSchema.userId, id));
}

export const submitDesires = async (userId: number, desireIds: number[]) => {
    for (let i of desireIds) {
        createUserToDesire(userId, i)
    }
}

const createUserToDesire = async (userId: number, desireId: number) => {
    const newUserToDesire: userToDesire = { userId, desireId };
    return await db.insert(userToDesireSchema).values(newUserToDesire)
}

export const getDesireUsers = async (id: number) => {
    return db.select({ users: userSchema })
        .from(userToDesireSchema)
        .rightJoin(desireSchema, eq(userToDesireSchema.desireId, desireSchema.id))
        .leftJoin(userSchema, eq(userToDesireSchema.userId, userSchema.id))
        .where(eq(desireSchema.id, id));
}