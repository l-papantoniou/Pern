CREATE DATABASE company;

\connect company;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS employees(
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(19),
    lastName VARCHAR(25),
    birthDate DATE,
    afm VARCHAR(9) UNIQUE
);

CREATE TABLE IF NOT EXISTS users(
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL

);

INSERT INTO users (email, password)
VALUES ('user@gmail.com', '1111');