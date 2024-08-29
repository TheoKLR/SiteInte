import { pgTable, serial, text, integer, date, boolean } from "drizzle-orm/pg-core";
import { userSchema } from "./user.schema";
import { primaryKey } from 'drizzle-orm/pg-core';

export const permanenceSchema = pgTable("Permanence", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  location: text("location").notNull(),
  maxRegistrations: integer("max_registrations").notNull(),
  isRegistrationOpen: boolean("is_registration_open").default(false),
});

// Schéma des inscriptions
export const registrationSchema = pgTable("Registration", {
  userId: integer("user_id").references(() => userSchema.id, { onDelete: "cascade" }).notNull(),
  permanenceId: integer("permanence_id").references(() => permanenceSchema.id, { onDelete: "cascade" }).notNull(),
  registeredAt: date("registered_at").defaultNow(),
}, (table) => ({
  pk: primaryKey(table.userId, table.permanenceId) // Clé primaire composite
}))


export type Permanence = typeof permanenceSchema.$inferInsert;
export type Registration = typeof registrationSchema.$inferInsert;