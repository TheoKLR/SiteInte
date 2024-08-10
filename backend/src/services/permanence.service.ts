import {
  permanenceSchema,
  Permanence,
  userToPermanenceSchema,
  UserToPermanence,
  timeLimitSchema,
} from "../schemas/permanence.schema";
import { db } from "../database/db";
import { eq } from "drizzle-orm";

export const getAllPermanences = async () => {
  try {
    return await db.select().from(permanenceSchema);
  } catch (error) {
    throw new Error("Failed to fetch Permanences");
  }
};

export const getAllAvailablePermanences = async () => {
  try {
    const timeLimit = await getTimeLimit()
    const perms = await getAllPermanences()

    return perms.filter(
      (perm) => perm.maxStudentNumber > perm.studentNumber && perm.startingTime < timeLimit
    )
  } catch (error) {
    throw new Error("Failed to fetch Permanences");
  }
};

export const getPermanence = async (id: number) => {
  try {
    return await db
      .select()
      .from(permanenceSchema)
      .where(eq(permanenceSchema.id, id));
  } catch (error) {
    throw new Error("Failed to fetch Permanence");
  }
};

export const createPermanence = async (
  name: string,
  desc: string,
  startingTime: Date,
  duration: Date,
  maxStudentNumber: number
) => {
  try {
    const newPermanence: Permanence = {
      name,
      desc,
      startingTime,
      duration,
      maxStudentNumber,
      studentNumber: 0
    };
    const result = await db.insert(permanenceSchema).values(newPermanence);

    if (!result) {
      throw new Error("Failed to insert new Permanence into the database.");
    }
    return result;
  } catch (error) {
    throw new Error("Failed to create Permanence");
  }
};

export const deletePermanence = async (id: number) => {
  try {
    await removeUsersToPermanence(id);
    await db.delete(permanenceSchema).where(eq(permanenceSchema.id, id));
  } catch (error) {
    throw new Error("Failed to delete Permanence");
  }
};

export const addUserToPermanence = async (userId: number, permId: number) => {
  try {
    const perm = (await getPermanence(permId))[0]

    if (perm.maxStudentNumber > perm.studentNumber) {
      const newUserToPermanence: UserToPermanence = { userId, permId };
      await db.insert(userToPermanenceSchema).values(newUserToPermanence);
      return true;
    }
    return false;
  } catch (error) {
    throw new Error("Failed to add user to permanence");
  }
};

export const removeUsersToPermanence = async (id: number) => {
  try {
    await db
      .delete(userToPermanenceSchema)
      .where(eq(userToPermanenceSchema.permId, id));
  } catch (error) {
    throw new Error(
      "Failed to remove user from permanence"
    );
  }
};

export const updateTimeLimit = async () => {
  const oneWeekFromNow = new Date();
  oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 8);
  oneWeekFromNow.setHours(0, 0, 0, 0);
  
  try {
    await db
      .update(timeLimitSchema)
      .set({ limit: oneWeekFromNow })
      .where(eq(timeLimitSchema.id, 0));
      
  } catch (error) {
    throw new Error(
      "Failed to update time limit"
    );
  }
};

export const getTimeLimit = async () => {
  try {
    const limit = await db
      .select()
      .from(timeLimitSchema)
      .where(eq(timeLimitSchema.id, 0));

    return limit[0].limit;
  } catch (error) {
    throw new Error(
      "Failed to get user from permanence"
    );
  }
};
