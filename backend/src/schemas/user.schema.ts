import { pgTable, serial, text, integer, pgEnum } from "drizzle-orm/pg-core";
import { teamSchema } from "./team.schema";

export const role = pgEnum('role', ['newStudent', 'Student', 'teamLeader', 'Admin']);

export enum RoleType {
  NewStudent = 'newStudent',
  Student = 'Student',
  TeamLeader = 'teamLeader',
  Admin = 'Admin',
}

export const userSchema = pgTable("user", {
  id: serial("id").primaryKey(),
  first_name: text("first_name").notNull(),
  last_name: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: role('role').notNull(),
  team: integer('team').references(() => teamSchema.id)
});

export type User = typeof userSchema.$inferInsert;
