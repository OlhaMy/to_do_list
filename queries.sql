CREATE TABLE heute (
	id SERIAL PRIMARY KEY,
	title VARCHAR(100) NOT NULL 
);

CREATE TABLE woche (
	id SERIAL PRIMARY KEY,
	title VARCHAR(100) NOT NULL
);

CREATE TABLE monat (
	id SERIAL PRIMARY KEY,
	title VARCHAR(100) NOT NULL
);

CREATE TABLE jahr (
	id SERIAL PRIMARY KEY,
	title VARCHAR(100) NOT NULL
	);

INSERT INTO heute (title) VALUES ('Buy milk'), ('Finish homework');

INSERT INTO woche (title) VALUES ('go to shop'), ('tagesschlaf');

INSERT INTO monat (title) VALUES ('spazieren gehen'), ('deutsch kurs');

INSERT INTO jahr (title) VALUES ('job finden'), ('umziehen');