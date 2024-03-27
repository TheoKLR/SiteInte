ALTER TABLE "team" DROP CONSTRAINT "team_team_name_unique";--> statement-breakpoint
ALTER TABLE "team" ADD COLUMN "isOfficial" boolean NOT NULL;--> statement-breakpoint
ALTER TABLE "team" ADD COLUMN "timeCode" timestamp;