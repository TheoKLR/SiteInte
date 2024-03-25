import { roleSchema, Role, userToRoleSchema, userToRole, } from "../schemas/role.schema"
import { userSchema } from "../schemas/user.schema"
import { db } from "../database/db"
import { eq, and } from 'drizzle-orm'

export const getAllRoles = async () => {
    return await db.select().from(roleSchema)
}

export const getRole = async (id: number) => {
    const Role = await db.select().from(roleSchema).where(eq(roleSchema.id, id))
    return Role[0]
}

export const createRole = async (name: string, description: string) => {
    const newRole: Role = { name, description }
    await db.insert(roleSchema).values(newRole)
}

export const deleteRole = async (id: number) => {
    await db.delete(roleSchema).where(eq(roleSchema.id, id))
}

export const addUserRoles = async (userId: number, roleIds: number[]) => {
    for (const id of roleIds) {
        await createUserToRole(userId, id)
    }
}

export const removeUserRoles = async (userId: number, roleIds: number[]) => {
    for (const id of roleIds) {
        await removeUserToRole(userId, id)
    }
}

export const submitWish = async (userId: number, RoleIds: number[]) => {
    db.delete(userToRoleSchema).where(eq(userToRoleSchema.userId, userId))
    for (const id of RoleIds) {
        await createUserToWish(userId, id)
    }
}

const createUserToRole = async (userId: number, roleId: number) => {
    const newUserToRole: userToRole = { userId, roleId, isWish: false }
    const role = await db.select()
        .from(userToRoleSchema)
        .where(eq(userToRoleSchema, newUserToRole))

    if (role.length === 0) {
        await db.insert(userToRoleSchema).values(newUserToRole)
    }
}

const removeUserToRole = async (userId: number, roleId: number) => {
    const UserToRole: userToRole = { userId, roleId, isWish: false }
    const role = await db.select()
        .from(userToRoleSchema)
        .where(eq(userToRoleSchema, UserToRole))

    if (role.length !== 0) {
        await db.delete(userToRoleSchema).where(eq(userToRoleSchema, role))
    }
}

const createUserToWish = async (userId: number, roleId: number) => {
    const newUserToWish: userToRole = { userId, roleId, isWish: true }
    return await db.insert(userToRoleSchema).values(newUserToWish)
}


/*
export const getRoleUsers = async (id: number) => {
    return db.select({ users: userSchema })
        .from(userToRoleSchema)
        .rightJoin(roleSchema, eq(userToRoleSchema.roleId, roleSchema.id))
        .leftJoin(userSchema, eq(userToRoleSchema.userId, userSchema.id))
        .where(eq(roleSchema.id, id))
}*/