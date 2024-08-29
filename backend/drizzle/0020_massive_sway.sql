ALTER TABLE "Registration" ADD CONSTRAINT "Registration_user_id_permanence_id_pk" PRIMARY KEY("user_id","permanence_id");--> statement-breakpoint
ALTER TABLE "Registration" DROP COLUMN IF EXISTS "id";