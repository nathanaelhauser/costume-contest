-- schema.sql for the costume content
DROP DATABASE IF EXISTS costumes_db;
CREATE DATABASE costumes_db;
USE costumes_db;
CREATE TABLE contestants(
  name VARCHAR(256) NOT NULL,
  costume VARCHAR(256) NOT NULL,
  votes INTEGER(10) NOT NULL,
  votedYet BOOL NOT NULL
);
