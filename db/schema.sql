CREATE DATABASE todo_list_db;
USE todo_list_db;

CREATE TABLE todo_items (
  id integer(10) AUTO_INCREMENT NOT NULL,
  todo_text varchar(160) NOT NULL,
  PRIMARY KEY(id)
);
