ALTER TYPE "role" ADD VALUE 'admin1';--> statement-breakpoint
ALTER TYPE "role" ADD VALUE 'admin2';--> statement-breakpoint
ALTER TABLE "faction" ADD CONSTRAINT "faction_team_name_unique" UNIQUE("team_name");--> statement-breakpoint
ALTER TABLE "team" ADD CONSTRAINT "team_team_name_unique" UNIQUE("team_name");--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_email_unique" UNIQUE("email");