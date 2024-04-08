import { pgTable, serial, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { factionSchema } from "./faction.schema";

export const teamSchema = pgTable('team', {
    id: serial('id').primaryKey(),
    isOfficial: boolean('isOfficial').notNull(),
    timeCode: timestamp('timeCode'),
    name: text('team_name').notNull().unique(),
    faction: integer('city_id').references(() => factionSchema.id)
});

export type Team = typeof teamSchema.$inferInsert;
