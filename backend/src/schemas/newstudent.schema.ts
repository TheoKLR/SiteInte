import { pgTable, boolean, integer, uuid, text } from "drizzle-orm/pg-core";
import { userSchema } from "./user.schema";

export const newstudentSchema = pgTable('newstudent', {
    uuid: uuid('uuid').primaryKey().defaultRandom(),
    isUsed: boolean("isUsed").notNull().default(false),
    email: text("email").notNull().unique()
});

export type newstudentUUID = typeof newstudentSchema.$inferInsert;
