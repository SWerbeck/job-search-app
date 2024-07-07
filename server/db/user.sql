DROP TABLE IF EXISTS _AppliedCompany;
DROP TABLE IF EXISTS _PASTCOMP;
DROP TABLE IF EXISTS _APPLICATION;
DROP TABLE IF EXISTS CONTACT_PAST_JOB;
DROP TABLE IF EXISTS _CONTACT;
DROP TABLE IF EXISTS _COMPANY;
DROP TABLE IF EXISTS _USER;

CREATE TYPE role_type AS ENUM ('User', 'Admin');

CREATE TABLE _USER(
  user_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  FIRST_NAME VARCHAR(255) NOT NULL,
  LAST_NAME VARCHAR(50) NOT NULL,
  USER_PASSWORD TEXT NOT NULL,
  creation_date TIMESTAMPTZ DEFAULT Now()::timestamp, 
  User_email VARCHAR(255) NOT NULL UNIQUE,
  UserName VARCHAR(50) NOT NULL UNIQUE,
  roles role_type DEFAULT 'User',
  CHECK (User_email LIKE '%@%'),
  CHECK (User_email LIKE '%.com%')
 
);

--creation_date DATE DEFAULT CURRENT_DATE,

INSERT INTO _USER (FIRST_NAME, LAST_NAME, USER_PASSWORD, User_email, UserName)
VALUES ('Louis', 'Rabeno', '123', 'louis@test.com', 'louisiscool123');

INSERT INTO _USER (FIRST_NAME, LAST_NAME, USER_PASSWORD, User_email, UserName)
VALUES ('Stephen', 'Werbeck', '123', 'steve@gmail.com', 'SWerb');


INSERT INTO _USER (FIRST_NAME, LAST_NAME, USER_PASSWORD, User_email, UserName)
VALUES ('guest', 'guest', '123', 'guest@guestmail.com', 'guest');

