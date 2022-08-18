CREATE DATABASE company;

CREATE TABLE employees(
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(19),
    lastName VARCHAR(25),
    birthDate DATE,
    afm VARCHAR(9) UNIQUE
);


--set extention for uuid generate
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL

);


--insert into users  
--bcrypted salt password 10 times
INSERT INTO users (email, password)
VALUES ('user@gmail.com', '1111');
