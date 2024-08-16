-- 1. Rename tables and columns
ALTER TABLE "permanence" RENAME TO "Permanence"; --> statement-breakpoint
ALTER TABLE "userToPermanence" RENAME TO "Registration"; --> statement-breakpoint

ALTER TABLE "Permanence" RENAME COLUMN "name" TO "title"; --> statement-breakpoint
ALTER TABLE "Permanence" RENAME COLUMN "desc" TO "description"; --> statement-breakpoint
ALTER TABLE "Permanence" RENAME COLUMN "startingTime" TO "start_time"; --> statement-breakpoint
ALTER TABLE "Permanence" RENAME COLUMN "duration" TO "end_time"; --> statement-breakpoint
ALTER TABLE "Permanence" RENAME COLUMN "studentNumber" TO "max_registrations"; --> statement-breakpoint

ALTER TABLE "Registration" RENAME COLUMN "perm_id" TO "id"; --> statement-breakpoint

-- 2. Drop old constraints if they exist
ALTER TABLE "Permanence" DROP CONSTRAINT IF EXISTS "permanence_name_unique"; --> statement-breakpoint
ALTER TABLE "Registration" DROP CONSTRAINT IF EXISTS "userToPermanence_user_id_user_id_fk"; --> statement-breakpoint
ALTER TABLE "Registration" DROP CONSTRAINT IF EXISTS "userToPermanence_perm_id_permanence_id_fk"; --> statement-breakpoint

-- 3. Modify columns to match new schema
-- Assuming `start_time` and `end_time` are already in `date` format; no need for conversion
-- Ensure columns have the correct type and are not affected by old constraints

-- 4. Add new columns and constraints
ALTER TABLE "Registration" ADD PRIMARY KEY ("id"); --> statement-breakpoint

ALTER TABLE "Permanence" ADD COLUMN "location" text NOT NULL; --> statement-breakpoint
ALTER TABLE "Permanence" ADD COLUMN "is_registration_open" boolean DEFAULT false; --> statement-breakpoint

ALTER TABLE "Registration" ADD COLUMN "permanence_id" integer NOT NULL; --> statement-breakpoint
ALTER TABLE "Registration" ADD COLUMN "registered_at" date DEFAULT now(); --> statement-breakpoint

-- 5. Add foreign key constraints
DO $$ 
BEGIN
  ALTER TABLE "Registration" ADD CONSTRAINT "Registration_user_id_user_id_fk" 
    FOREIGN KEY ("user_id") REFERENCES "user"("id") 
    ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$; --> statement-breakpoint

DO $$ 
BEGIN
  ALTER TABLE "Registration" ADD CONSTRAINT "Registration_permanence_id_Permanence_id_fk" 
    FOREIGN KEY ("permanence_id") REFERENCES "Permanence"("id") 
    ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$; --> statement-breakpoint
