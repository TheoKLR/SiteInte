CREATE TABLE IF NOT EXISTS "permanence" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"desc" text NOT NULL,
	"startingTime" text NOT NULL,
	"duration" bigint NOT NULL,
	"studentNumber" integer NOT NULL,
	CONSTRAINT "permanence_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "faction" DROP CONSTRAINT "faction_name_unique";--> statement-breakpoint
ALTER TABLE "faction" DROP CONSTRAINT "faction_desc_unique";--> statement-breakpoint
ALTER TABLE "faction" ADD COLUMN "team_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "faction" ADD COLUMN "points" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "faction" DROP COLUMN IF EXISTS "name";--> statement-breakpoint
ALTER TABLE "faction" DROP COLUMN IF EXISTS "desc";--> statement-breakpoint
ALTER TABLE "faction" DROP COLUMN IF EXISTS "startingTime";--> statement-breakpoint
ALTER TABLE "faction" DROP COLUMN IF EXISTS "duartion";--> statement-breakpoint
ALTER TABLE "faction" DROP COLUMN IF EXISTS "studenNumber";--> statement-breakpoint
ALTER TABLE "faction" ADD CONSTRAINT "faction_team_name_unique" UNIQUE("team_name");