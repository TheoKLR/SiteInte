import {
  permanenceSchema,
  Permanence,
  userToPermanenceSchema,
  UserToPermanence,
} from "../schemas/permanence.schema";
import { db } from "../database/db";
import { eq } from 'drizzle-orm';

export const getAllPermanences = async () => {
    try {
        return await db.select().from(permanenceSchema);
    } catch (error) {
        throw new Error("Failed to fetch Permanences. Please try again later.");
    }
}

export const getPermanence = async (id: number) => {
    try {
        return await db.select().from(permanenceSchema).where(eq(permanenceSchema.id, id));
    } catch (error) {
        throw new Error("Failed to fetch Permanence. Please try again later.");
    }
}

export const createPermanence = async (
    name: string, 
    desc: string, 
    startingTime: number, 
    duration: number, 
    studentNumber: number
) => {
    try {
        const newPermanence: Permanence = { name, desc, startingTime, duration, studentNumber };
        const result = await db.insert(permanenceSchema).values(newPermanence);
        
        if (!result) {
            throw new Error("Failed to insert new Permanence into the database.");
        }
        return result; 
    } catch (error) {
        throw new Error("Failed to create Permanence. Please try again later."); 
    }
}

export const deletePermanence = async (id: number) => {
    try {
        await removeUsersToPermanence(id)
        await db.delete(permanenceSchema).where(eq(permanenceSchema.id, id));
    } catch (error) {
        throw new Error("Failed to delete Permanence. Please try again later.");
    }
}

export const addUserToPermanence = async (userId: number, permId: number) => {
  try {
    const maxUser = await getMaxNumberOfUserInPermanence(permId) || 0; 
    const userNumber = await getNumberOfUserInPermanence(permId) || 0;
    if (maxUser > userNumber) {
        const newUserToPermanence: UserToPermanence = { userId, permId };
        await db.insert(userToPermanenceSchema).values(newUserToPermanence);
        return true
    }
    return false
  } catch (error) {
    throw new Error(
      "Failed to add user to permanence"
    );
  }
};

export const getNumberOfUserInPermanence = async (permId: number) => {
  try {
      const users = await db
        .select()
        .from(userToPermanenceSchema)
        .where(eq(userToPermanenceSchema.permId, permId));   

    return users.length           
  } catch (error) {
    throw new Error("Failed to add user to permanence");
  }
};

export const getMaxNumberOfUserInPermanence = async (permId: number) => {
  try {
    const result = await db
      .select({ maxNumber: permanenceSchema.studentNumber })
      .from(permanenceSchema)
      .where(eq(permanenceSchema.id, permId));
      
    return result[0].maxNumber;
  } catch (error) {
    throw new Error("Failed to add user to permanence");
  }
};

export const removeUsersToPermanence = async (id: number) => {
    try {
        await db.delete(userToPermanenceSchema)
            .where(eq(userToPermanenceSchema.permId, id));
    } catch (error) {
        throw new Error("Failed to remove team from faction. Please try again later.");
    }
}