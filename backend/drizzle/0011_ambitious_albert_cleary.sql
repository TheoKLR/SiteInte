CREATE TABLE IF NOT EXISTS "permanence" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"desc" text NOT NULL,
	"startingTime" bigint,
	"duartion" bigint,
	"studenNumber" integer,
	CONSTRAINT "permanence_name_unique" UNIQUE("name"),
	CONSTRAINT "permanence_desc_unique" UNIQUE("desc")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userToPermanence" (
	"user_id" integer NOT NULL,
	"perm_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "faction" RENAME COLUMN "team_name" TO "faction_name";--> statement-breakpoint
ALTER TABLE "faction" DROP CONSTRAINT "faction_team_name_unique";--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "discord_id" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userToPermanence" ADD CONSTRAINT "userToPermanence_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userToPermanence" ADD CONSTRAINT "userToPermanence_perm_id_permanence_id_fk" FOREIGN KEY ("perm_id") REFERENCES "permanence"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "faction" ADD CONSTRAINT "faction_faction_name_unique" UNIQUE("faction_name");