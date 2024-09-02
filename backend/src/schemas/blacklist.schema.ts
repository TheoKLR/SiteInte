import { pgTable, serial, text, integer, pgEnum, date } from "drizzle-orm/pg-core";
import { teamSchema } from "./team.schema";

export const blacklistSchema = pgTable("blacklist", {
  email: text("email").notNull().unique()
});

export type BlacklistSchema = typeof blacklistSchema.$inferInsert;
