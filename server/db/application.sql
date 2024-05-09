DROP TABLE IF EXISTS _APPLICATION;

CREATE TYPE application_stat AS ENUM ('active', 'closed', 'interviewing');


CREATE TABLE _APPLICATION(
 applied_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 job_title VARCHAR(255) NOT NULL,
 creation_date TIMESTAMPTZ DEFAULT Now(),
 last_updated TIMESTAMPTZ DEFAULT Now(),
 company_id uuid NOT NULL,
 user_id uuid NOT NULL,
 application_info VARCHAR(8000)DEFAULT NULL,
 application_status application_stat DEFAULT 'active',
 FOREIGN KEY (company_id) REFERENCES _COMPANY(company_id)
 ON DELETE CASCADE,
 FOREIGN KEY (user_id) REFERENCES _USER(user_id)
 ON DELETE CASCADE
);
 
-- ALTER TABLE _AppliedCompany
-- ADD COLUMN user_id uuid;

-- ALTER TABLE _AppliedCompany 
--    --ADD CONSTRAINT fk_someName
--    FOREIGN KEY (user_id) 
--    REFERENCES _USER(user_id);


INSERT INTO _APPLICATION(job_title, company_id, user_id )
VALUES ('software engineer', (SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'GOOGLE'), (SELECT user_id FROM _USER WHERE UserName = 'louisiscool123') );

INSERT INTO _APPLICATION(job_title, company_id, user_id)
VALUES ('front end devloper', (SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'Spotify'), (SELECT user_id FROM _USER WHERE UserName = 'louisiscool123'));

INSERT INTO _APPLICATION(job_title, company_id, user_id)
VALUES ('software engineer',(SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'X'), (SELECT user_id FROM _USER WHERE UserName = 'louisiscool123'));

INSERT INTO _APPLICATION(job_title, company_id, user_id)
VALUES ('front end devloper',(SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'Data-Dog'), (SELECT user_id FROM _USER WHERE UserName = 'louisiscool123'));

INSERT INTO _APPLICATION(job_title, company_id, user_id)
VALUES ('back end developer', (SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'Pinterest'), (SELECT user_id FROM _USER WHERE UserName = 'SWerb'));

INSERT INTO _APPLICATION(job_title, company_id, user_id)
VALUES ('front end devloper',(SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'Spotify'), (SELECT user_id FROM _USER WHERE UserName = 'SWerb'));

INSERT INTO _APPLICATION(job_title, company_id, user_id)
VALUES ('software engineer',(SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'Rumble'), (SELECT user_id FROM _USER WHERE UserName = 'SWerb'));

INSERT INTO _APPLICATION(job_title, company_id, user_id)
VALUES ('front end devloper',(SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'GOOGLE'), (SELECT user_id FROM _USER WHERE UserName = 'SWerb'));

INSERT INTO _APPLICATION(job_title, company_id, user_id)
VALUES ('software engineer',(SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'GOOGLE'), (SELECT user_id FROM _USER WHERE UserName = 'guest'));

INSERT INTO _APPLICATION(job_title, company_id, user_id)
VALUES ('front end devloper',(SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'X'), (SELECT user_id FROM _USER WHERE UserName = 'guest'));

INSERT INTO _APPLICATION(job_title, company_id, user_id)
VALUES ('back end developer',(SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'Spotify'), (SELECT user_id FROM _USER WHERE UserName = 'guest'));

INSERT INTO _APPLICATION(job_title, company_id, user_id)
VALUES ('software engineer',(SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'Rumble'), (SELECT user_id FROM _USER WHERE UserName = 'guest'));

INSERT INTO _APPLICATION(job_title, company_id, user_id)
VALUES ('back end developer',(SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'Pinterest'), (SELECT user_id FROM _USER WHERE UserName = 'guest'));

INSERT INTO _APPLICATION(job_title, company_id, user_id)
VALUES ('software engineer',(SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'META'), (SELECT user_id FROM _USER WHERE UserName = 'guest'));