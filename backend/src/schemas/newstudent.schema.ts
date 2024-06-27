import { pgTable, boolean, integer, uuid } from "drizzle-orm/pg-core";
import { userSchema } from "./user.schema";

export const newstudentSchema = pgTable('newstudentUUID', {
    uuid: uuid('uiid').primaryKey().defaultRandom(),
    isUsed: boolean("isUsed").notNull().default(false),
    userId: integer('user_id').references(() => userSchema.id),
});

export type newstudentUUID = typeof newstudentSchema.$inferInsert;
