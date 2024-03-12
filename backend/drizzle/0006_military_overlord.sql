CREATE TABLE IF NOT EXISTS "challenge" (
	"id" serial PRIMARY KEY NOT NULL,
	"challenge_name" text NOT NULL,
	"challenge_desc" text NOT NULL,
	"points" integer NOT NULL,
	CONSTRAINT "challenge_challenge_name_unique" UNIQUE("challenge_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "factionTochallenge" (
	"faction_id" integer NOT NULL,
	"challenge_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "desire" DROP CONSTRAINT "desire_desire_desc_unique";--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "contact" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "factionTochallenge" ADD CONSTRAINT "factionTochallenge_faction_id_faction_id_fk" FOREIGN KEY ("faction_id") REFERENCES "faction"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "factionTochallenge" ADD CONSTRAINT "factionTochallenge_challenge_id_challenge_id_fk" FOREIGN KEY ("challenge_id") REFERENCES "challenge"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
