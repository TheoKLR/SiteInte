ALTER TABLE "newstudent" DROP CONSTRAINT "newstudent_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "newstudent" ADD COLUMN "email" text NOT NULL;--> statement-breakpoint
ALTER TABLE "newstudent" DROP COLUMN IF EXISTS "user_id";--> statement-breakpoint
ALTER TABLE "newstudent" ADD CONSTRAINT "newstudent_email_unique" UNIQUE("email");