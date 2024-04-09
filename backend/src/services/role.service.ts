import { roleSchema, Role, userToRoleSchema, userToRole, } from "../schemas/role.schema"
import { userSchema } from "../schemas/user.schema"
import { db } from "../database/db"
import { eq, and } from 'drizzle-orm'
export const getAllRoles = async () => {
    try {
        return await db.select().from(roleSchema);
    } catch (error) {
        throw new Error("Failed to fetch roles. Please try again later.");
    }
}

export const getRole = async (id: number) => {
    try {
        const role = await db.select().from(roleSchema).where(eq(roleSchema.id, id));
        return role[0];
    } catch (error) {
        throw new Error("Failed to fetch role. Please try again later.");
    }
}

export const createRole = async (name: string, description: string) => {
    try {
        const newRole: Role = { name, description };
        await db.insert(roleSchema).values(newRole);
    } catch (error) {
        throw new Error("Failed to create role. Please try again later.");
    }
}

export const deleteRole = async (id: number) => {
    try {
        await db.delete(roleSchema).where(eq(roleSchema.id, id));
    } catch (error) {
        throw new Error("Failed to delete role. Please try again later.");
    }
}

export const addUserRoles = async (userId: number, roleIds: number[]) => {
    try {
        for (const id of roleIds) {
            await createUserToRole(userId, id);
        }
    } catch (error) {
        throw new Error("Failed to add user roles. Please try again later.");
    }
}

export const removeUserRoles = async (userId: number, roleIds: number[]) => {
    try {
        for (const id of roleIds) {
            await removeUserToRole(userId, id);
        }
    } catch (error) {
        throw new Error("Failed to remove user roles. Please try again later.");
    }
}

export const submitWish = async (userId: number, roleIds: number[]) => {
    try {
        await db.delete(userToRoleSchema).where(and(
            eq(userToRoleSchema.userId, userId),
            eq(userToRoleSchema.isWish, true),
        ));
        for (const id of roleIds) {
            await createUserToWish(userId, id);
        }
    } catch (error) {
        throw new Error("Failed to submit wish. Please try again later.");
    }
}

const createUserToRole = async (userId: number, roleId: number) => {
    try {
        const newUserToRole: userToRole = { userId, roleId, isWish: false };
        const role = await db.select().from(userToRoleSchema).where(eq(userToRoleSchema, newUserToRole));
        if (role.length === 0) {
            await db.insert(userToRoleSchema).values(newUserToRole);
        }
    } catch (error) {
        throw new Error("Failed to create user to role. Please try again later.");
    }
}

const removeUserToRole = async (userId: number, roleId: number) => {
    try {
        const UserToRole: userToRole = { userId, roleId, isWish: false };
        const role = await db.select().from(userToRoleSchema).where(eq(userToRoleSchema, UserToRole));
        if (role.length !== 0) {
            await db.delete(userToRoleSchema).where(eq(userToRoleSchema, role));
        }
    } catch (error) {
        throw new Error("Failed to remove user to role. Please try again later.");
    }
}

const createUserToWish = async (userId: number, roleId: number) => {
    try {
        const newUserToWish: userToRole = { userId, roleId, isWish: true };
        await db.insert(userToRoleSchema).values(newUserToWish);
    } catch (error) {
        throw new Error("Failed to create user to wish. Please try again later.");
    }
}

export const getWishUsers = async (id: number) => {
    try {
        return db.select({ users: userSchema })
            .from(userToRoleSchema)
            .rightJoin(roleSchema, eq(userToRoleSchema.roleId, roleSchema.id))
            .leftJoin(userSchema, eq(userToRoleSchema.userId, userSchema.id))
            .where(and(
                eq(roleSchema.id, id), 
                eq(userToRoleSchema.isWish, true)
            ));
    } catch (error) {
        throw new Error("Failed to fetch wish users. Please try again later.");
    }
}
