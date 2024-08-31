ALTER TABLE "userToRole" DROP CONSTRAINT "userToRole_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "birthday" date;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userToRole" ADD CONSTRAINT "userToRole_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
