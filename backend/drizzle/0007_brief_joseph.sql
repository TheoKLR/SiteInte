CREATE TABLE IF NOT EXISTS "newstudentUUID" (
	"uiid" uuid PRIMARY KEY NOT NULL,
	"isUsed" boolean DEFAULT false NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "newstudentUUID" ADD CONSTRAINT "newstudentUUID_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
