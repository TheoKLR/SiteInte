CREATE TYPE "challenge_type" AS ENUM('Faction', 'Free', 'Student', 'StudentOrCe', 'Team');

CREATE TABLE IF NOT EXISTS "freeToChallenge" (
	"faction_id" integer NOT NULL,
	"text" text NOT NULL,
	"attributed_points" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "studentTochallenge" (
	"student_id" integer NOT NULL,
	"challenge_id" integer NOT NULL,
	"attributed_points" integer NOT NULL,
	CONSTRAINT "studentTochallenge_student_id_challenge_id_pk" PRIMARY KEY("student_id","challenge_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "teamTochallenge" (
	"team_id" integer NOT NULL,
	"challenge_id" integer NOT NULL,
	"attributed_points" integer NOT NULL,
	CONSTRAINT "teamTochallenge_team_id_challenge_id_pk" PRIMARY KEY("team_id","challenge_id")
);
--> statement-breakpoint
ALTER TABLE "challenge" ALTER COLUMN "points" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "factionTochallenge" ADD CONSTRAINT "factionTochallenge_faction_id_challenge_id_pk" PRIMARY KEY("faction_id","challenge_id");--> statement-breakpoint
ALTER TABLE "challenge" ADD COLUMN "chall_type" "challenge_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "factionTochallenge" ADD COLUMN "attributed_points" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "freeToChallenge" ADD CONSTRAINT "freeToChallenge_faction_id_faction_id_fk" FOREIGN KEY ("faction_id") REFERENCES "faction"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "studentTochallenge" ADD CONSTRAINT "studentTochallenge_student_id_user_id_fk" FOREIGN KEY ("student_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "studentTochallenge" ADD CONSTRAINT "studentTochallenge_challenge_id_challenge_id_fk" FOREIGN KEY ("challenge_id") REFERENCES "challenge"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "teamTochallenge" ADD CONSTRAINT "teamTochallenge_team_id_team_id_fk" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "teamTochallenge" ADD CONSTRAINT "teamTochallenge_challenge_id_challenge_id_fk" FOREIGN KEY ("challenge_id") REFERENCES "challenge"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
