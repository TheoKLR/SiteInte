
import { db } from "../database/db"
import {blacklistSchema} from "../schemas/blacklist.schema";
import {permanenceSchema} from "../schemas/permanence.schema";

export const GetAllBlacklistedStudent = async () => {
    try {
        return await db.select({
            email: blacklistSchema.email
        }).from(blacklistSchema);
    } catch (error) {
        throw new Error("Failed to fetch users. Please try again later.");
    }
}

export const Blacklist = async (email: string) => {
    try {
        return await db.insert(blacklistSchema).values({email: email})
    } catch (error) {
        throw new Error("Failed to fetch users. Please try again later.");
    }
}