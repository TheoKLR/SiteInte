import { pgTable, serial, text, integer, pgEnum, date } from "drizzle-orm/pg-core";
import { teamSchema } from "./team.schema";
import {factionSchema} from "./faction.schema";
import {userSchema} from "./user.schema";
import {primaryKey} from "drizzle-orm/pg-core/index";

export const busAttributionSchema = pgTable("bus_attribution", {
  user_id: integer('user_id').primaryKey().notNull().references(() => userSchema.id),
  bus: integer("bus").notNull()
});

export type BusAttributionSchema = typeof busAttributionSchema.$inferInsert;
