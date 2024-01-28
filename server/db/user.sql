DROP TABLE IF EXISTS _USER;

CREATE TABLE _USER(
  ID INT PRIMARY KEY NOT NULL,
  FIRST_NAME VARCHAR(255) NOT NULL,
  LAST_NAME VARCHAR(50) NOT NULL,
  User_email VARCHAR(255) NOT NULL UNIQUE ,
  UserName VARCHAR(50) NOT NULL UNIQUE
  
);

INSERT INTO _USER (ID, FIRST_NAME, LAST_NAME, User_email, UserName)
VALUES (1, 'Louis', 'Rabeno', 'louis@test.com', 'louisiscool123');

INSERT INTO _USER (ID, FIRST_NAME, LAST_NAME, User_email, UserName)
VALUES (2, 'Stephen', 'Werbeck', 'steve@gmail.com', 'SWerb');