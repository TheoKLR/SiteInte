import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";
import { factionSchema } from "./faction.schema";

export const teamSchema = pgTable('team', {
    id: serial('id').primaryKey(),
    name: text('team_name').notNull().unique(),
    faction: integer('city_id').references(() => factionSchema.id)
});

export type Team = typeof teamSchema.$inferInsert;
