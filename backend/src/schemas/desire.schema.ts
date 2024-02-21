import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";
import { userSchema } from "./user.schema";

export const desireSchema = pgTable('desire', {
    id: serial('id').primaryKey(),
    name: text('desire_name').notNull().unique(),
    description: text('desire_desc').notNull().unique(),
});

export type Desire = typeof desireSchema.$inferInsert;

export const userToDesireSchema = pgTable('useRToDesire', {
    userId: integer('user_id').notNull().references(() => userSchema.id),
    desireId: integer('desire_id').notNull().references(() => desireSchema.id),
});

export type userToDesire = typeof userToDesireSchema.$inferInsert;
