DO $$ BEGIN
 CREATE TYPE "permission" AS ENUM('newStudent', 'Student', 'Admin', 'RespoCE', 'Respo', 'Anim');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "challenge" (
	"id" serial PRIMARY KEY NOT NULL,
	"challenge_name" text NOT NULL,
	"challenge_desc" text NOT NULL,
	"points" integer NOT NULL,
	CONSTRAINT "challenge_challenge_name_unique" UNIQUE("challenge_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "factionTochallenge" (
	"faction_id" integer NOT NULL,
	"challenge_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "event" (
	"id" serial PRIMARY KEY NOT NULL,
	"event_name" text NOT NULL,
	"state" boolean NOT NULL,
	CONSTRAINT "event_event_name_unique" UNIQUE("event_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "faction" (
	"id" serial PRIMARY KEY NOT NULL,
	"team_name" text NOT NULL,
	"points" integer NOT NULL,
	CONSTRAINT "faction_team_name_unique" UNIQUE("team_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "role" (
	"id" serial PRIMARY KEY NOT NULL,
	"role_name" text NOT NULL,
	"role_desc" text NOT NULL,
	CONSTRAINT "role_role_name_unique" UNIQUE("role_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userToRole" (
	"user_id" integer NOT NULL,
	"role_id" integer NOT NULL,
	"isWish" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "team" (
	"id" serial PRIMARY KEY NOT NULL,
	"isOfficial" boolean NOT NULL,
	"timeCode" timestamp,
	"team_name" text NOT NULL,
	"city_id" integer,
	CONSTRAINT "team_team_name_unique" UNIQUE("team_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"contact" text,
	"connection_num" integer NOT NULL,
	"permission" "permission" NOT NULL,
	"password" text NOT NULL,
	"team" integer,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "factionTochallenge" ADD CONSTRAINT "factionTochallenge_faction_id_faction_id_fk" FOREIGN KEY ("faction_id") REFERENCES "faction"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "factionTochallenge" ADD CONSTRAINT "factionTochallenge_challenge_id_challenge_id_fk" FOREIGN KEY ("challenge_id") REFERENCES "challenge"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userToRole" ADD CONSTRAINT "userToRole_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userToRole" ADD CONSTRAINT "userToRole_role_id_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team" ADD CONSTRAINT "team_city_id_faction_id_fk" FOREIGN KEY ("city_id") REFERENCES "faction"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_team_team_id_fk" FOREIGN KEY ("team") REFERENCES "team"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
