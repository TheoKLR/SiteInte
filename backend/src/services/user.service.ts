
import { userSchema, User, PermType } from '../schemas/user.schema';
import { newstudentSchema } from '../schemas/newstudent.schema';
import { roleSchema, userToRoleSchema } from '../schemas/role.schema';
import { db } from "../database/db"
import {eq, and, is, ne, isNotNull, sql} from 'drizzle-orm'
import { uuid } from 'drizzle-orm/pg-core';
import { permission } from 'process';

export const GetAllNewStudent = async () => {
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
        }).from(userSchema).where(eq(userSchema.permission, PermType.NewStudent));
    } catch (error) {
        throw new Error("Failed to fetch users. Please try again later.");
    }
}

export const GetAllStudent = async () => {
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
        }).from(userSchema).where(eq(userSchema.permission, PermType.NewStudent));
    } catch (error) {
        throw new Error("Failed to fetch users. Please try again later.");
    }
}

export const getAllCe = async () => {
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
        }).from(userSchema).where(and(
            eq(userSchema.permission, PermType.Student),
            isNotNull(userSchema.team)
        ));
    } catch (error) {
        throw new Error("Failed to fetch users. Please try again later.");
    }
}

export const getAllByPermission = async (permission : PermType) => {

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
        .where(eq(userSchema.permission, permission ));
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

export const createUser = async (first_name: string, last_name: string, email: string, birthday: string | null, branch: string| null, contact: string| null, discord_id: string| null, password: string, permission: PermType) => {
    try {
        const allUser = await GetAllNewStudent();
        if (allUser.length === 0) permission = PermType.Admin;

        const newUser: User = { first_name, last_name, email,branch: branch, birthday: birthday, contact: contact, discord_id: discord_id, connection_number: 0, permission, password, team: null };
        await db.insert(userSchema).values(newUser);
    } catch (error) {
        throw new Error("Failed to create user. Please try again later.");
    }
}

export const updateUser = async (id: number, branch : string, contact: string, discord_id: string) => {
    try {
        await db.update(userSchema).set({ 
            branch: branch,
            contact: contact,
            discord_id: discord_id}).where(eq(userSchema.id, id));
    } catch (error) {
        throw new Error("Failed to update user. Please try again later.");
    }
}

export const registerUser = async (first_name: string, last_name: string, email: string, birthday: string | null, branch: string| null, contact: string| null, discord_id: string| null, password: string) => {
    try {
        await db.update(userSchema).set({
            first_name: first_name,
            last_name: last_name,
            birthday: birthday,
            branch: branch,
            password: password,
            contact: contact,
            discord_id: discord_id}).where(eq(userSchema.email, email));
    } catch (error) {
        throw new Error("Failed to update user. Please try again later.");
    }
}

export const updateUserStudent = async (id: any, first_name: string, last_name: string, email: string, branch: string| null, birthday: string| null) => {
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
                        permission: userSchema.permission,
                        team_id: userSchema.team,
                        contact: userSchema.contact
                        })
                        .from(userSchema)
                        .where(eq(userSchema.team, team_id));

        return members;
    } catch (error) {
        throw new Error("Failed to get the team's timecode. Please try again later.");
    }
}

export const updateUserPassword = async(id: number, password: string) => {
    try{
        await db.update(userSchema).set({
            password: password
        }).where(eq(userSchema.id, id));

    }catch(error){
        throw new Error("Failed to update user password. Please try again later.");
    }
}

type UserData = {
    etu_number: string
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    new: boolean,
    ce: boolean,
    team_number: number | null,
    orga: boolean,
    mission: string,
    major: boolean
}

export async function getInfo(emails: string[]): Promise<any[]> {
    //checking faction exist
    let list = []
    for (let email of emails) {
        const user = await db.select().from(userSchema).where(eq(userSchema.email, email));
        if(!user || user.length === 0) throw new Error("No user with mail '" + email + "'")
        list.push([
            "",
            user[0].first_name,
            user[0].last_name,
            email,
            "",
            isNew(user[0]),
            isCe(user[0]),
            user[0].team,
            isOrga(user[0]),
            "",
            isMajor(user[0])
        ])
    }
    return list
}

export async function getMissing(datas: {first_name: string, last_name: string}[]): Promise<any[]> {
    //checking faction exist
    let list = []
    for (let data of datas) {
        const first_name = data.first_name
        const last_name = data.last_name
        const user = await db.select().from(userSchema).where(
            and(
                eq(userSchema.first_name, first_name),
                eq(sql`UPPER(${userSchema.last_name})`, last_name.toUpperCase())
            )
        );
        if(!user || user.length === 0) list.push(data)
    }
    return list
}

/*
        list.push({
            etu_number: "",
            first_name: user[0].first_name,
            last_name: user[0].last_name,
            email: email,
            phone: "",
            new: isNew(user[0]),
            ce: isCe(user[0]),
            team_number: user[0].team,
            orga: isOrga(user[0]),
            mission: "",
            major: isMajor(user[0])
        })
 */

export function isCe(user: User) {
    return user.permission === PermType.Student && user.team !== undefined
}

function isMajor(user: User): boolean {
    if(!user.birthday) return false
    const birthDate = new Date(user.birthday);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Si l'anniversaire n'est pas encore passé cette année, on soustrait 1
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age >= 18;
}

function isOrga(user: User) {
    return user.permission !== PermType.NewStudent
}

function isNew(user: User) {
    return user.permission === PermType.NewStudent
}
