ALTER TABLE "newstudentUUID" RENAME TO "newstudent";--> statement-breakpoint
ALTER TABLE "newstudent" RENAME COLUMN "uiid" TO "uuid";--> statement-breakpoint
ALTER TABLE "newstudent" DROP CONSTRAINT "newstudentUUID_user_id_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "newstudent" ADD CONSTRAINT "newstudent_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
