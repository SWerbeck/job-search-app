DROP TABLE IF EXISTS _COMPANY;

CREATE TABLE _COMPANY(
  ID INT PRIMARY KEY NOT NULL,
  COMPANYNAME VARCHAR(255) NOT NULL UNIQUE,
  WEBSITE VARCHAR(255) NOT NULL UNIQUE,
  CHECK (WEBSITE LIKE '%.com%')
 
);

INSERT INTO _COMPANY (ID, COMPANYNAME, WEBSITE)
VALUES (1, 'GOOGLE', 'careers.google.com');

INSERT INTO _COMPANY (ID, COMPANYNAME, WEBSITE)
VALUES (2, 'JP Morgan', 'careers.jpmorgan.com');

INSERT INTO _COMPANY (ID, COMPANYNAME, WEBSITE)
VALUES (3, 'Spotify', 'careers.spotify.com');

INSERT INTO _COMPANY (ID, COMPANYNAME, WEBSITE)
VALUES (4, 'Data-Dog', 'careers.datadog.com');

INSERT INTO _COMPANY (ID, COMPANYNAME, WEBSITE)
VALUES (5, 'X', 'careers.x.com');

INSERT INTO _COMPANY (ID, COMPANYNAME, WEBSITE)
VALUES (6, 'META', 'careers.meta.com');

INSERT INTO _COMPANY (ID, COMPANYNAME, WEBSITE)
VALUES (7, 'Shopify', 'careers.shopify.com');

INSERT INTO _COMPANY (ID, COMPANYNAME, WEBSITE)
VALUES (8, 'Pinterest', 'careers.pinterest.com');

INSERT INTO _COMPANY (ID, COMPANYNAME, WEBSITE)
VALUES (9, 'QA Wolf', 'careers.qawolf.com');

INSERT INTO _COMPANY (ID, COMPANYNAME, WEBSITE)
VALUES (10, 'Rumble', 'careers.rumble.com');




DROP TABLE IF EXISTS _AppliedCompany;

CREATE TABLE _AppliedCompany(
 ID INT PRIMARY KEY NOT NULL,
 company_id int NOT NULL,
 user_id int NOT NULL,
 FOREIGN KEY (company_id) REFERENCES _COMPANY(ID)
 ON DELETE CASCADE,
 FOREIGN KEY (user_id) REFERENCES _USER(ID)
 ON DELETE CASCADE



);


INSERT INTO _AppliedCompany(ID, company_id, user_id)
VALUES (1, 1, 1);

INSERT INTO _AppliedCompany(ID, company_id, user_id)
VALUES (2, 3, 1);

INSERT INTO _AppliedCompany(ID, company_id, user_id)
VALUES (3, 7, 1);

INSERT INTO _AppliedCompany(ID, company_id, user_id)
VALUES (4, 2, 2);

INSERT INTO _AppliedCompany(ID, company_id, user_id)
VALUES (5, 6, 2);