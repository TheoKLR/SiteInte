CREATE TABLE IF NOT EXISTS "useRToDesire" (
	"user_id" integer NOT NULL,
	"desire_id" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "useRToDesire" ADD CONSTRAINT "useRToDesire_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "useRToDesire" ADD CONSTRAINT "useRToDesire_desire_id_desire_id_fk" FOREIGN KEY ("desire_id") REFERENCES "desire"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
