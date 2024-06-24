import { userSchema, User, PermType } from '../schemas/user.schema';
import { newstudentSchema, newstudentUUID } from '../schemas/newstudent.schema';
import { roleSchema, userToRoleSchema } from '../schemas/role.schema';
import { db } from "../database/db"
import { eq, and } from 'drizzle-orm'
import { uuid } from 'drizzle-orm/pg-core';
import { all } from 'axios';
import { create } from 'domain';

export const setUUID = async(UUID: string, isUsed: boolean, userId: number)=> {
    try{
        await db.update(newstudentSchema)
            .set({isUsed: isUsed, userId: userId})
            .where(eq(newstudentSchema.uuid, UUID));
    }catch(error){
        throw new Error("Failed to set user UUID. Please try again later.");
    }
}

export const createUUID = async()=> {
    try{
        const newstudent : newstudentUUID = {};
        await db.insert(newstudentSchema).values(newstudent);
    }catch(error){
        throw new Error("Failed to set user UUID. Please try again later.");
    }
}

export const deleteByUUID = async( UUID : string)=> {
    try{
        await db.delete(newstudentSchema).where(eq(newstudentSchema.uuid, UUID));
    }catch(error){
        throw new Error("Failed to delete user UUID. Please try again later.");
    }
}

export const getAllnewStudent = async()=>{
    try{
        return await db.select({
            uuid :newstudentSchema.uuid, 
            isUsed: newstudentSchema.isUsed, 
            userId: newstudentSchema.userId})
        .from(newstudentSchema);
    }catch(error){
        throw new Error("An error occurred. Please try again later.");
    }
}

export const getIsUsedbyUUID = async(UUID : string) => {
    try {

        const response = await db.select(
            { isUsed: newstudentSchema.isUsed }
        )
        .from(newstudentSchema)
        .where(eq(newstudentSchema.uuid, UUID));

        if (response.length === 0) {
            return null;
        }

        return response[0];
    } catch (error) {
        console.error("Database query failed: ", error);
        throw new Error("An error occurred. Please try again later.");
    }
}