import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const factionSchema = pgTable('faction', {
    id: serial('id').primaryKey(),
    name: text('team_name').notNull(),
    points: integer('points')
});

export type Faction = typeof factionSchema.$inferInsert;
