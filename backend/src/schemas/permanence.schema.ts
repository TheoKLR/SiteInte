import { bigint, pgTable, serial, text, integer } from "drizzle-orm/pg-core";
import { userSchema } from "./user.schema";

export const permanenceSchema = pgTable('permanence', {
    id: serial('id').primaryKey(),
    name: text('name').notNull().unique(),
    desc: text('desc').notNull().unique(),
    startingTime: bigint('startingTime', { mode: 'number' }),
    duration: bigint('duartion', { mode: 'number' }),
    studentNumber: integer('studenNumber'),
});

export const userToPermanenceSchema = pgTable('userToPermanence', {
    userId: integer('user_id').notNull().references(() => userSchema.id, { onDelete: "cascade" }),
    permId: integer('perm_id').notNull().references(() => permanenceSchema.id, { onDelete: "cascade" }),
});


export type Permanence = typeof permanenceSchema.$inferInsert;
export type UserToPermanence = typeof userToPermanenceSchema.$inferInsert;