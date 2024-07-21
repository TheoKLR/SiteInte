
import { userSchema, User, PermType } from '../schemas/user.schema';
import { newstudentSchema } from '../schemas/newstudent.schema';
import { roleSchema, userToRoleSchema } from '../schemas/role.schema';
import { db } from "../database/db"
import { eq, and, is } from 'drizzle-orm'
import { uuid } from 'drizzle-orm/pg-core';

export const getAllUsers = async () => {
    try {
        return await db.select({
            id: userSchema.id,
            first_name: userSchema.first_name,
            last_name: userSchema.last_name,
            email: userSchema.email,
            branch: userSchema.branch,
            permission: userSchema.permission,
            birthday: userSchema.birthday,
            contact: userSchema.contact,
            discord_id: userSchema.discord_id,
            connection_number: userSchema.connection_number,
            team_id: userSchema.team,
        }).from(userSchema);
    } catch (error) {
        throw new Error("Failed to fetch users. Please try again later.");
    }
}

export const getAllNewStudents = async () => {
    try {
        return await db.select({
            id: userSchema.id,
            first_name: userSchema.first_name,
            last_name: userSchema.last_name,
            email: userSchema.email,
            branch: userSchema.branch,
            permission: userSchema.permission,
            birthday: userSchema.birthday,
            contact: userSchema.contact,
            discord_id: userSchema.discord_id,
            connection_number: userSchema.connection_number,
            team_id: userSchema.team,
            
        }).from(userSchema)
        .where(eq(userSchema.permission, PermType.NewStudent ));
    } catch (error) {
        throw new Error("Failed to fetch users. Please try again later.");
    }
}

export const getUserLight = async () => {
    try {
        return await db.select({
            id: userSchema.id,
            first_name: userSchema.first_name,
            last_name: userSchema.last_name,
            team_id: userSchema.team,
        }).from(userSchema);
    } catch (error) {
        throw new Error("Failed to fetch user light. Please try again later.");
    }
}

export const getUser = async (id: number) => {
    try {
        const user = await db.select({
            id: userSchema.id,
            first_name: userSchema.first_name,
            last_name: userSchema.last_name,
            email: userSchema.email,
            branch: userSchema.branch,
            birthday : userSchema.birthday,
            contact : userSchema.contact,
            discord_id: userSchema.discord_id,
            permission: userSchema.permission,
            connection_number: userSchema.connection_number,
            team_id: userSchema.team,
        }).from(userSchema).where(eq(userSchema.id, id));

        return user.length === 0 ? null : user[0];
    } catch (error) {
        throw new Error("Failed to fetch user. Please try again later.");
    }
}

//Used to get a newStudent based on the email and the permission
export const getNewStudentByEmail = async (email: string) => {
    try {
        const user = await db.select().from(userSchema).where(
            and(
                eq(userSchema.email, email),
                eq(userSchema.permission, PermType.NewStudent)
            )
        );

        return user.length === 0 ? null : user[0];
    } catch (error) {
        throw new Error("Failed to fetch new student by email. Please try again later.");
    }
}

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.select().from(userSchema).where(eq(userSchema.email, email));
        return user.length === 0 ? null : user[0];
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch user by email. Please try again later.");
    }
}

export const createUser = async (first_name: string, last_name: string, email: string, birthday: string, branch: string, contact: string, discord_id: string, password: string, permission: PermType) => {
    try {
        const allUser = await getAllUsers();
        if (allUser.length === 0) permission = PermType.Admin;

        const newUser: User = { first_name, last_name, email,branch: branch, birthday: birthday, contact: contact, discord_id: discord_id, connection_number: 0, permission, password, team: null };
        await db.insert(userSchema).values(newUser);
    } catch (error) {
        throw new Error("Failed to create user. Please try again later.");
    }
}

export const updateUser = async (id: number, first_name: string, last_name: string, birthday: string, contact: string, discord_id: string) => {
    try {
        await db.update(userSchema).set({ 
            first_name: first_name, 
            last_name: last_name, 
            birthday: birthday, 
            contact: contact, 
            discord_id: discord_id}).where(eq(userSchema.id, id));
    } catch (error) {
        throw new Error("Failed to update user. Please try again later.");
    }
}

export const updateUserStudent = async (id: any, first_name: string, last_name: string, email: string, branch: string, birthday: string) => {
    try {
        await db.update(userSchema).set({ 
            first_name: first_name, 
            last_name: last_name, 
            email:email, 
            branch: branch, 
            birthday: birthday }).where(eq(userSchema.id, id));
    } catch (error) {
        throw new Error("Failed to update user. Please try again later.");
    }
}

export const deleteUser = async (id: number) => {
    try {
        await db.delete(userSchema).where(eq(userSchema.id, id));
    } catch (error) {
        throw new Error("Failed to delete user. Please try again later.");
    }
}

export const removeUsersFromTeam = async (id: number) => {
    try {
        await db.update(userSchema)
            .set({ team: null })
            .where(eq(userSchema.team, id));
    } catch (error) {
        throw new Error("Failed to remove users from team. Please try again later.");
    }
}

export const addToTeam = async (UserIds: number[], TeamId: number) => {
    try {
        for (const id of UserIds) {
            await db.update(userSchema)
                .set({ team: TeamId })
                .where(eq(userSchema.id, id));
        }
    } catch (error) {
        throw new Error("Failed to add users to team. Please try again later.");
    }
}

export const addContact = async (id: number, contact: string) => {
    try {
        await db.update(userSchema)
            .set({ contact: contact })
            .where(eq(userSchema.id, id));
    } catch (error) {
        throw new Error("Failed to add contact. Please try again later.");
    }
}

export const changePermission = async (id: number, perm: PermType) => {
    try {
        await db.update(userSchema)
            .set({ permission: perm })
            .where(eq(userSchema.id, id));
    } catch (error) {
        throw new Error("Failed to change permission. Please try again later.");
    }
}

export const incrementConnection = async (id: number) => {
    try {
        const user = await getUser(id);
        const num = user?.connection_number || 0;

        await db.update(userSchema)
            .set({ connection_number: num + 1 })
            .where(eq(userSchema.id, id));
    } catch (error) {
        throw new Error("Failed to increment connection. Please try again later.");
    }
}

export const SendEmailToAll = async (content: any) => {
    try {
        await db.update(userSchema)
            .set({ permission: content })
            .where(eq(userSchema.id, content));
    } catch (error) {
        throw new Error("Failed to change permission. Please try again later.");
    }
}

export const SendEmailToPerms = async (content: any) => {
    try {
        await db.update(userSchema)
            .set({ permission: content })
            .where(eq(userSchema.id, content));
    } catch (error) {
        throw new Error("Failed to change permission. Please try again later.");
    }
}

export const getUserWish = async (id: number) => {
    try {
        return await db.select({ desires: roleSchema })
            .from(userToRoleSchema)
            .rightJoin(roleSchema, eq(userToRoleSchema.roleId, roleSchema.id))
            .leftJoin(userSchema, eq(userToRoleSchema.userId, userSchema.id))
            .where(and(
                eq(userSchema.id, id),
                eq(userToRoleSchema.isWish, true)
            ));
    } catch (error) {
        throw new Error("Failed to fetch user wish. Please try again later.");
    }
}

export async function getUserbyTeam(teamID: any) {
    try {

        const users = await db.select().from(userSchema).where(eq(userSchema.team, teamID));
        return users.length === 0 ? null : users;
    } catch (error) {
        throw new Error("Failed to fetch user by team. Please try again later.");
    }
}

export async function updateTeam(id: number, teamId: any) {
    try {
        await db.update(userSchema).set({ 
            team: teamId  })
        .where(eq(userSchema.id, id));
    } catch (error) {
        throw new Error("Failed to update user. Please try again later.");
    }
}

export const getAllMembersTeam = async (team_id: number) => {
    try {
        const members = await db.select({
                        id: userSchema.id,
                        first_name: userSchema.first_name,
                        last_name: userSchema.last_name,
                        email: userSchema.email,
                        team_id: userSchema.team,
                        })
                        .from(userSchema)
                        .where(eq(userSchema.team, team_id));

        return members;
    } catch (error) {
        throw new Error("Failed to get the team's timecode. Please try again later.");
    }
}
