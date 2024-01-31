import { pgTable, serial, text, integer, pgEnum } from "drizzle-orm/pg-core";
import { teamSchema } from "./team.schema";

export const role = pgEnum('role', ['new_student', 'student', 'admin']);

export const studentSchema = pgTable("user", {
  id: serial("id").primaryKey(),
  first_name: text("first_name").notNull(),
  last_name: text("last_name").notNull(),
  email: text("email").notNull(),
  password: text("password"),
  role: role('role'),
  team: integer('team').references(() => teamSchema.id)
});

export type Student = typeof studentSchema.$inferInsert;
