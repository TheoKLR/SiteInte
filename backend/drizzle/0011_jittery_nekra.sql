ALTER TABLE "faction" DROP CONSTRAINT "faction_team_name_unique";--> statement-breakpoint
ALTER TABLE "faction" ADD COLUMN "name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "faction" ADD COLUMN "desc" text NOT NULL;--> statement-breakpoint
ALTER TABLE "faction" ADD COLUMN "startingTime" bigint;--> statement-breakpoint
ALTER TABLE "faction" ADD COLUMN "duartion" bigint;--> statement-breakpoint
ALTER TABLE "faction" ADD COLUMN "studenNumber" integer;--> statement-breakpoint
ALTER TABLE "faction" DROP COLUMN IF EXISTS "team_name";--> statement-breakpoint
ALTER TABLE "faction" DROP COLUMN IF EXISTS "points";--> statement-breakpoint
ALTER TABLE "faction" ADD CONSTRAINT "faction_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "faction" ADD CONSTRAINT "faction_desc_unique" UNIQUE("desc");