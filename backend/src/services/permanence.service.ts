import { permanenceSchema, Permanence, registrationSchema, Registration  } from "../schemas/permanence.schema";
import { db } from "../database/db";
import { and, eq } from 'drizzle-orm';
import { userSchema } from "../schemas/user.schema";

export const getAllPermanences = async () => {
    try {
        return await db.select().from(permanenceSchema);
    } catch (error) {
        throw new Error("Failed to fetch Permanences. Please try again later.");
    }
}

export const getPermanence = async (id: number) => {
    try {
        const permanence = await db.select().from(permanenceSchema).where(eq(permanenceSchema.id, id));

        return permanence[0];
    } catch (error) {
        throw new Error("Failed to fetch Permanence. Please try again later.");
    }
}

export const createPermanence = async (
    title: string, 
    description: string, 
    startTime: string, 
    endTime: string, 
    location: string, 
    maxRegistrations: number
    ) => {

    try {
        const newPermanence: Permanence = {
            title, 
            description, 
            startTime: startTime, 
            endTime: endTime, 
            location, 
            maxRegistrations, 
            isRegistrationOpen: false
        };
        const permanence = await db.insert(permanenceSchema).values(newPermanence);
        
        return permanence;
    } catch (error) {
        throw new Error("Failed to create Permanence. Please try again later."+ error); 
    }
}

export const updatePermanence = async (
    id: number,
    title: string, 
    description: string, 
    startTime: string, 
    endTime: string, 
    location: string, 
    maxRegistrations: number,
    isRegistrationOpen: boolean

    ) => {
    try {

        const updatedPermanence = await db.update(permanenceSchema)
        .set({ 
            title : title, 
            description : description, 
            startTime : startTime, 
            endTime : endTime, 
            location : location, 
            maxRegistrations : maxRegistrations,
            isRegistrationOpen: isRegistrationOpen
        })
        .where(eq(permanenceSchema.id, id));
        
        return updatedPermanence;
    } catch (error) {
        throw new Error("Failed to update Permanence. Please try again later."+error); 
    }
}

export const deletePermanence = async (id : number) => {

    try{

        await db.delete(permanenceSchema).where(eq(permanenceSchema.id, id));

    }catch(error){
        throw new Error("Failed to delete Permanence. Please try again later."+error); 
    }
}

export const openPermanence = async (id : number) => {

    try{

        const permanence = await db.update(permanenceSchema)
            .set({ isRegistrationOpen: true })
            .where(eq( permanenceSchema.id, id));

        return permanence;

    }catch(error){
        throw new Error("Failed to delete Permanence. Please try again later."); 
    }
}

export const getUserRegistration = async (id : number, userId: number) => {

    try{
        const userRegistration = await db.select().from(registrationSchema)
        .where(and(eq( registrationSchema.permanenceId, id), eq(registrationSchema.userId, userId )))

        return userRegistration[0];

    }catch(error){
        throw new Error("Failed to get user Registration. Please try again later."); 
    }
}

export const getRegistration = async (id : number) => {

    try{

        const registration = await db.select().from(registrationSchema).where(eq( registrationSchema.permanenceId, id));

        return registration;

    }catch(error){
        throw new Error("Failed to get Registration. Please try again later."); 
    }
}

export const registerUser = async (id : number, userId: number) => {

    try{
        const newregister : Registration = { userId : userId, permanenceId: id};

        const register = await db.insert(registrationSchema).values(newregister);

        return register;

    }catch(error){
        throw new Error("Failed to Register user. Please try again later."+ error ); 
    }
}

export const unRegisterUser = async (id : number, userId: number) => {

    try{

        await db.delete(registrationSchema)
            .where(and(eq( registrationSchema.permanenceId, id), eq(registrationSchema.userId, userId)));


    }catch(error){
        throw new Error("Failed to Register user. Please try again later."); 
    }
}

export const getRegistrations = async (id : number) => {

    try{

       const registrations =  await db.select().from(registrationSchema)
        .innerJoin(userSchema, eq(userSchema.id, registrationSchema.userId))
        .where(eq(registrationSchema.permanenceId,id));

        return registrations;
    }catch(error){
        throw new Error("Failed to get Registrations. Please try again later."); 
    }
}

export const getMemberOfPerm = async (id : number) => {
    try{
        const registrationsWithUsers = await db
            .select({
                userId: userSchema.id,
                firstName: userSchema.first_name,
                lastName: userSchema.last_name,
                email: userSchema.email,
            })
            .from(registrationSchema)
            .innerJoin(userSchema, eq(registrationSchema.userId, userSchema.id))
            .where(eq(registrationSchema.permanenceId, id));
        return registrationsWithUsers;
    }catch(error){
        throw new Error("Failed to get Registrations. Please try again later.");
    }
}

export const setMembersOfPerm = async (permId : number, usersId: number[]) => {
    try{
        await db
            .delete(registrationSchema)
            .where(eq(registrationSchema.permanenceId, permId));

        if (usersId.length > 0) {
            const newRegistrations = usersId.map(userId => ({
                permanenceId: permId,
                userId: userId
            }));
            await db.insert(registrationSchema).values(newRegistrations);
        }
    }catch(error){
        console.error(error)
        throw new Error("Failed to get Registrations. Please try again later.");
    }
}

export const getUserRegistrations = async (userId : number) => {

    try{

       const registrations =  await db.select().from(registrationSchema)
        .where(eq(registrationSchema.userId,userId));

        return registrations;
    }catch(error){
        throw new Error("Failed to get Registrations. Please try again later."); 
    }
}

export const openClosePermanence = async (id : number, isRegistrationOpen: boolean) => {

    try{

        const permanence = await db.update(permanenceSchema)
            .set({ isRegistrationOpen: isRegistrationOpen })
            .where(eq( permanenceSchema.id, id));

        return permanence;

    }catch(error){
        throw new Error("Failed to delete Permanence. Please try again later."); 
    }
}