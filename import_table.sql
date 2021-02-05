BEGIN;

DROP TABLE IF EXISTS 
"user",
"planet",
"mission",
"institution",
"level",
"quiz",
"question",
"proposition",
"institution_launches_mission",
"planet_welcomes_mission",
"user_likes_mission",
"quiz_handles_question",
"user_plays_quiz",
"question_has_proposition",
"proposition_confirms_question";

CREATE TABLE IF NOT EXISTS "user"(
"id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"username" VARCHAR(25) NOT NULL,
"lastname" VARCHAR(50) NOT NULL,
"firstname" VARCHAR(50) NOT NULL,
"email" VARCHAR(80) NOT NULL,
"password" VARCHAR(80) NOT NULL,
"birthday" DATE NOT NULL,
"role" VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS "planet"(
"id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"name" VARCHAR(50) NOT NULL,
"description" TEXT NOT NULL,
"position" INT NOT NULL,
"is_planet" BOOLEAN NOT NULL,
"surface" DECIMAL,
"mass" DECIMAL,
"volume" DECIMAL,
"gravity" DECIMAL,
"temp_max" DECIMAL,
"temp_average" DECIMAL,
"temp_min" DECIMAL,
"sidereal_orbit" DECIMAL,
"sidereal_rotation" DECIMAL,
"rotation_speed" DECIMAL,
"discovered_by" VARCHAR(250),
"discovery_date" DATE,
"geopolitics_info" TEXT,
"pollution_info" TEXT,
"picture_link" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "mission"(
"id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"mission_name" VARCHAR(75) NOT NULL,
"program_name" VARCHAR(75),
"launch_date" DATE NOT NULL,
"planet_geoloc" VARCHAR(250),
"mission_goal" TEXT NOT NULL,
"human_mission" BOOLEAN,
"mission_type" VARCHAR(50),
"return_flight" BOOLEAN  NOT NULL,
"picture_link" VARCHAR(250)
);

CREATE TABLE IF NOT EXISTS "institution"(
"id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"name" TEXT  NOT NULL
);

CREATE TABLE IF NOT EXISTS "level"(
"id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"name" VARCHAR(50)  NOT NULL
);

CREATE TABLE IF NOT EXISTS "quiz"(
"id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"title" VARCHAR(80)  NOT NULL,
"description" TEXT  NOT NULL,
"nbr_of_questions" INT,
"id_level" integer NOT NULL REFERENCES "level" ("id"),
"id_user" integer NOT NULL REFERENCES "user" ("id"),
"id_planet" integer NOT NULL REFERENCES "planet" ("id")
);

CREATE TABLE IF NOT EXISTS "question"(
"id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"title" TEXT  NOT NULL,
"wiki" TEXT
);


CREATE TABLE IF NOT EXISTS "proposition"(
"id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"description" VARCHAR(250)  NOT NULL
);

-- ----------------------
-- MANY TO MANY RELATIONS
-- ----------------------

CREATE TABLE IF NOT EXISTS "institution_launches_mission"(
  "id_institution" INT REFERENCES "institution"("id"),
  "id_mission" INT REFERENCES "mission"("id"),
  PRIMARY KEY ("id_institution", "id_mission"),
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "planet_welcomes_mission"(
  "id_planet" INT REFERENCES "planet"("id"),
  "id_mission" INT REFERENCES "mission"("id"),
  PRIMARY KEY ("id_planet", "id_mission"),
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP
);

-- NB : define favorites missions of user

CREATE TABLE IF NOT EXISTS "user_likes_mission"(
  "id_user" INT REFERENCES "user"("id"),
  "id_mission" INT REFERENCES "mission"("id"),
  PRIMARY KEY ("id_user", "id_mission"),
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "quiz_handles_question"(
  "id_quiz" INT REFERENCES "quiz"("id"),
  "id_question" INT REFERENCES "question"("id"),
  PRIMARY KEY ("id_quiz", "id_question"),
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "user_plays_quiz"(
  "id_user" INT REFERENCES "user"("id") ON DELETE CASCADE,
  "id_quiz" INT REFERENCES "quiz"("id"),
  PRIMARY KEY ("id_user", "id_quiz"),
  "score" INT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "question_has_proposition"(
  "id_question" INT REFERENCES "question"("id"),
  "id_proposition" INT REFERENCES "proposition"("id"),
  PRIMARY KEY ("id_question", "id_proposition"),
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "proposition_confirms_question"(
  "id_proposition" INT REFERENCES "proposition"("id"),
  "id_question" INT REFERENCES "question"("id"),
  PRIMARY KEY ("id_proposition", "id_question"),
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP
);

COMMIT;