CREATE TABLE IF NOT EXISTS "blacklist" (
	"email" text NOT NULL,
	CONSTRAINT "blacklist_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "team" RENAME COLUMN "city_id" TO "faction_id";--> statement-breakpoint
ALTER TABLE "team" DROP CONSTRAINT "team_city_id_faction_id_fk";
--> statement-breakpoint
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_user_id_permanence_id_pk" PRIMARY KEY("user_id","permanence_id");--> statement-breakpoint
ALTER TABLE "team" ADD COLUMN "gi_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team" ADD CONSTRAINT "team_faction_id_faction_id_fk" FOREIGN KEY ("faction_id") REFERENCES "faction"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "Registration" DROP COLUMN IF EXISTS "id";