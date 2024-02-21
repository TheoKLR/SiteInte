ALTER TYPE "role" ADD VALUE 'newStudent';--> statement-breakpoint
ALTER TYPE "role" ADD VALUE 'Student';--> statement-breakpoint
ALTER TYPE "role" ADD VALUE 'teamLeader';--> statement-breakpoint
ALTER TYPE "role" ADD VALUE 'Admin';--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "role" SET NOT NULL;