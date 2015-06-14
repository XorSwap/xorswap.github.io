-- Create database to hold the forum
CREATE DATABASE forum;
USE forum;

-- Setup threads table
CREATE TABLE threads(
	title VARCHAR(255) NOT NULL,
	id BIGINT NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (id)
);

-- Setup posts table
CREATE TABLE posts(
	reply BIGINT NOT NULL,
	content TEXT,
	id BIGINT NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (id)
);
