import { pgTable, serial, text, bigint, boolean, integer } from "drizzle-orm/pg-core";
import { factionSchema } from "./faction.schema";

export const teamSchema = pgTable('team', {
    id: serial('id').primaryKey(),
    isOfficial: boolean('isOfficial').notNull(),
    timeCode: bigint('timeCode', { mode: 'number' }), // Utiliser bigint pour stocker des nombres comme 1713014742620
    name: text('team_name').notNull().unique(),
    faction: integer('city_id').references(() => factionSchema.id)
});

export type Team = typeof teamSchema.$inferInsert;
