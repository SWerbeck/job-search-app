DROP TABLE IF EXISTS _COMPANY;

-- CREATE TABLE _COMPANY(
--   company_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
--   COMPANYNAME VARCHAR(255) NOT NULL UNIQUE,
--   user_id uuid NOT NULL,
--   FOREIGN KEY (user_id) REFERENCES _USER(user_id)
-- );

CREATE TABLE _COMPANY(
  company_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  COMPANYNAME VARCHAR(255) NOT NULL,
  COMPANY_WEBSITE VARCHAR(255),
  user_id uuid NOT NULL,
  FOREIGN KEY (user_id) REFERENCES _USER(user_id)
  ON DELETE CASCADE
);

--guest companies

INSERT INTO _COMPANY (COMPANYNAME, user_id)
VALUES ('GOOGLE', (SELECT user_id FROM _USER WHERE UserName = 'guest'));

INSERT INTO _COMPANY (COMPANYNAME, user_id )
VALUES ('JP Morgan', (SELECT user_id FROM _USER WHERE UserName = 'guest'));

INSERT INTO _COMPANY (COMPANYNAME, user_id )
VALUES ('Spotify', (SELECT user_id FROM _USER WHERE UserName = 'guest'));

INSERT INTO _COMPANY (COMPANYNAME, user_id )
VALUES ('Data-Dog', (SELECT user_id FROM _USER WHERE UserName = 'guest'));

INSERT INTO _COMPANY (COMPANYNAME, user_id )
VALUES ('X', (SELECT user_id FROM _USER WHERE UserName = 'guest'));

INSERT INTO _COMPANY (COMPANYNAME, user_id )
VALUES ('META', (SELECT user_id FROM _USER WHERE UserName = 'guest'));

INSERT INTO _COMPANY (COMPANYNAME, user_id )
VALUES ('Shopify', (SELECT user_id FROM _USER WHERE UserName = 'guest'));

INSERT INTO _COMPANY (COMPANYNAME, user_id )
VALUES ('Pinterest', (SELECT user_id FROM _USER WHERE UserName = 'guest'));

INSERT INTO _COMPANY (COMPANYNAME, user_id )
VALUES ('QA Wolf', (SELECT user_id FROM _USER WHERE UserName = 'guest'));

INSERT INTO _COMPANY (COMPANYNAME, user_id )
VALUES ('Rumble', (SELECT user_id FROM _USER WHERE UserName = 'guest'));

--User Louis companies

INSERT INTO _COMPANY (COMPANYNAME, user_id)
VALUES ('GOOGLE', (SELECT user_id FROM _USER WHERE UserName = 'louisiscool123'));

INSERT INTO _COMPANY (COMPANYNAME, user_id )
VALUES ('JP Morgan', (SELECT user_id FROM _USER WHERE UserName = 'louisiscool123'));

INSERT INTO _COMPANY (COMPANYNAME, user_id )
VALUES ('Spotify', (SELECT user_id FROM _USER WHERE UserName = 'louisiscool123'));

INSERT INTO _COMPANY (COMPANYNAME, user_id )
VALUES ('Data-Dog', (SELECT user_id FROM _USER WHERE UserName = 'louisiscool123'));

INSERT INTO _COMPANY (COMPANYNAME, user_id )
VALUES ('X', (SELECT user_id FROM _USER WHERE UserName = 'louisiscool123'));

INSERT INTO _COMPANY (COMPANYNAME, user_id )
VALUES ('META', (SELECT user_id FROM _USER WHERE UserName = 'louisiscool123'));

INSERT INTO _COMPANY (COMPANYNAME, user_id )
VALUES ('Shopify', (SELECT user_id FROM _USER WHERE UserName = 'louisiscool123'));

INSERT INTO _COMPANY (COMPANYNAME, user_id )
VALUES ('Pinterest', (SELECT user_id FROM _USER WHERE UserName = 'louisiscool123'));

INSERT INTO _COMPANY (COMPANYNAME, user_id )
VALUES ('QA Wolf', (SELECT user_id FROM _USER WHERE UserName = 'louisiscool123'));

INSERT INTO _COMPANY (COMPANYNAME, user_id )
VALUES ('Rumble', (SELECT user_id FROM _USER WHERE UserName = 'louisiscool123'));


-- User Stephen companies

INSERT INTO _COMPANY (COMPANYNAME, user_id)
VALUES ('GOOGLE', (SELECT user_id FROM _USER WHERE UserName = 'SWerb'));

INSERT INTO _COMPANY (COMPANYNAME, user_id )
VALUES ('JP Morgan', (SELECT user_id FROM _USER WHERE UserName = 'SWerb'));

INSERT INTO _COMPANY (COMPANYNAME, user_id )
VALUES ('Spotify', (SELECT user_id FROM _USER WHERE UserName = 'SWerb'));

INSERT INTO _COMPANY (COMPANYNAME, user_id )
VALUES ('Data-Dog', (SELECT user_id FROM _USER WHERE UserName = 'SWerb'));

INSERT INTO _COMPANY (COMPANYNAME, user_id )
VALUES ('X', (SELECT user_id FROM _USER WHERE UserName = 'SWerb'));

INSERT INTO _COMPANY (COMPANYNAME, user_id )
VALUES ('META', (SELECT user_id FROM _USER WHERE UserName = 'SWerb'));

INSERT INTO _COMPANY (COMPANYNAME, user_id )
VALUES ('Shopify', (SELECT user_id FROM _USER WHERE UserName = 'SWerb'));

INSERT INTO _COMPANY (COMPANYNAME, user_id )
VALUES ('Pinterest', (SELECT user_id FROM _USER WHERE UserName = 'SWerb'));

INSERT INTO _COMPANY (COMPANYNAME, user_id )
VALUES ('QA Wolf', (SELECT user_id FROM _USER WHERE UserName = 'SWerb'));

INSERT INTO _COMPANY (COMPANYNAME, user_id )
VALUES ('Rumble', (SELECT user_id FROM _USER WHERE UserName = 'SWerb'));


