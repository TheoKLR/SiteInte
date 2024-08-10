import { pgTable, serial, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { userSchema } from "./user.schema";

export const permanenceSchema = pgTable("permanence", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  desc: text("desc").notNull().unique(),
  startingTime: timestamp("startingTime").notNull(),
  duration: timestamp("duration"),
  maxStudentNumber: integer("maxStudenNumber").notNull(),
  studentNumber: integer("studentNumber").notNull(),
});

export const userToPermanenceSchema = pgTable('userToRole', {
    userId: integer('user_id').notNull().references(() => userSchema.id, { onDelete: "cascade" }),
    permId: integer('role_id').notNull().references(() => permanenceSchema.id, { onDelete: "cascade" }),
});

export const timeLimitSchema = pgTable("timeLimit", {
  id: serial("id").primaryKey(),
  limit: timestamp("limit").notNull(),
});

export type Permanence = typeof permanenceSchema.$inferInsert;
export type UserToPermanence = typeof userToPermanenceSchema.$inferInsert;