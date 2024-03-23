CREATE TABLE IF NOT EXISTS "event" (
	"id" serial PRIMARY KEY NOT NULL,
	"event_name" text NOT NULL,
	"state" boolean NOT NULL,
	CONSTRAINT "event_event_name_unique" UNIQUE("event_name")
);
