ALTER TABLE "newstudentUUID" ALTER COLUMN "uiid" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "newstudentUUID" ALTER COLUMN "user_id" DROP NOT NULL;