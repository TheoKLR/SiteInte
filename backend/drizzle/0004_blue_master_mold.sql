CREATE TABLE IF NOT EXISTS "desire" (
	"id" serial PRIMARY KEY NOT NULL,
	"desire_name" text NOT NULL,
	"desire_desc" text NOT NULL,
	CONSTRAINT "desire_desire_name_unique" UNIQUE("desire_name"),
	CONSTRAINT "desire_desire_desc_unique" UNIQUE("desire_desc")
);
