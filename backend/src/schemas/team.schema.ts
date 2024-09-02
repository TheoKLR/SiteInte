import { pgTable, serial, text, bigint, boolean, integer } from "drizzle-orm/pg-core";
import { factionSchema } from "./faction.schema";

export const teamSchema = pgTable('team', {
    id: serial('id').primaryKey(),
    isOfficial: boolean('isOfficial').notNull(),
    timeCode: bigint('timeCode', { mode: 'number' }),
    name: text('team_name').notNull().unique(),
    faction: integer('faction_id').references(() => factionSchema.id),
    gi_id: text('gi_id'),
    type: text('type')
});

export type Team = typeof teamSchema.$inferInsert;
