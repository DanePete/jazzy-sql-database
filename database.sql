CREATE TABLE "artists" (
    "id" SERIAL PRIMARY KEY,
    "artist_name" varchar(80) not null,
    "year_born" date
);

CREATE TABLE "song" (
	-- Define my columns <-- sql comment
	"id" SERIAL PRIMARY KEY,
	"title" VARCHAR(255), -- varchar is a simple way of saying just text/string
	"length" VARCHAR(10),
	"released" DATE
);