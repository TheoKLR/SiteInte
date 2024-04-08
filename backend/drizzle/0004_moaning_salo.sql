ALTER TABLE "user" ADD COLUMN "connection_num" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "team" ADD CONSTRAINT "team_team_name_unique" UNIQUE("team_name");