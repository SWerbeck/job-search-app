DROP TABLE IF EXISTS _APPLICATION;

CREATE TYPE applicationstat AS ENUM ('active', 'closed', 'interviewing');


CREATE TABLE _APPLICATION(
 applied_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 job_title VARCHAR(255) NOT NULL,
 creation_date TIMESTAMPTZ DEFAULT Now(),
 last_updated TIMESTAMPTZ DEFAULT Now(),
 company_id uuid NOT NULL,
 user_id uuid NOT NULL,
 application_info VARCHAR(8000)DEFAULT NULL,
 application_status applicationstat DEFAULT 'active',
 Listing_WEBSITE VARCHAR(255),
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
VALUES ('software engineer', (SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'GOOGLE' AND user_id = (SELECT user_id FROM _USER WHERE UserName = 'louisiscool123')), (SELECT user_id FROM _USER WHERE UserName = 'louisiscool123') );

INSERT INTO _APPLICATION(job_title, company_id, user_id)
VALUES ('front end devloper', (SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'Spotify' AND user_id = (SELECT user_id FROM _USER WHERE UserName = 'louisiscool123')), (SELECT user_id FROM _USER WHERE UserName = 'louisiscool123'));

INSERT INTO _APPLICATION(job_title, company_id, user_id)
VALUES ('software engineer',(SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'X' AND user_id = (SELECT user_id FROM _USER WHERE UserName = 'louisiscool123')), (SELECT user_id FROM _USER WHERE UserName = 'louisiscool123'));

INSERT INTO _APPLICATION(job_title, company_id, user_id)
VALUES ('front end devloper',(SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'Data-Dog' AND user_id = (SELECT user_id FROM _USER WHERE UserName = 'louisiscool123')), (SELECT user_id FROM _USER WHERE UserName = 'louisiscool123'));

INSERT INTO _APPLICATION(job_title, company_id, user_id)
VALUES ('back end developer', (SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'Pinterest' AND user_id = (SELECT user_id FROM _USER WHERE UserName = 'SWerb')), (SELECT user_id FROM _USER WHERE UserName = 'SWerb'));

INSERT INTO _APPLICATION(job_title, company_id, user_id)
VALUES ('front end devloper',(SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'Spotify' AND user_id = (SELECT user_id FROM _USER WHERE UserName = 'SWerb')), (SELECT user_id FROM _USER WHERE UserName = 'SWerb'));

INSERT INTO _APPLICATION(job_title, company_id, user_id)
VALUES ('software engineer',(SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'Rumble' AND user_id = (SELECT user_id FROM _USER WHERE UserName = 'SWerb')), (SELECT user_id FROM _USER WHERE UserName = 'SWerb'));

INSERT INTO _APPLICATION(job_title, company_id, user_id)
VALUES ('front end devloper',(SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'GOOGLE' AND user_id = (SELECT user_id FROM _USER WHERE UserName = 'SWerb')), (SELECT user_id FROM _USER WHERE UserName = 'SWerb'));

INSERT INTO _APPLICATION(job_title, company_id, user_id)
VALUES ('software engineer',(SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'GOOGLE' AND user_id =  (SELECT user_id FROM _USER WHERE UserName = 'guest')), (SELECT user_id FROM _USER WHERE UserName = 'guest'));

INSERT INTO _APPLICATION(job_title, company_id, user_id)
VALUES ('Sales rep',(SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'GOOGLE' AND user_id =  (SELECT user_id FROM _USER WHERE UserName = 'guest')), (SELECT user_id FROM _USER WHERE UserName = 'guest'));

INSERT INTO _APPLICATION(job_title, company_id, user_id)
VALUES ('Database manager',(SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'GOOGLE' AND user_id =  (SELECT user_id FROM _USER WHERE UserName = 'guest')), (SELECT user_id FROM _USER WHERE UserName = 'guest'));

INSERT INTO _APPLICATION(job_title, company_id, user_id)
VALUES ('Program manager',(SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'GOOGLE' AND user_id =  (SELECT user_id FROM _USER WHERE UserName = 'guest')), (SELECT user_id FROM _USER WHERE UserName = 'guest'));

INSERT INTO _APPLICATION(job_title, company_id, user_id)
VALUES ('Tech Team Lead',(SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'GOOGLE' AND user_id =  (SELECT user_id FROM _USER WHERE UserName = 'guest')), (SELECT user_id FROM _USER WHERE UserName = 'guest'));

INSERT INTO _APPLICATION(job_title, company_id, user_id)
VALUES ('Bug tester',(SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'GOOGLE' AND user_id =  (SELECT user_id FROM _USER WHERE UserName = 'guest')), (SELECT user_id FROM _USER WHERE UserName = 'guest'));

INSERT INTO _APPLICATION(job_title, company_id, user_id)
VALUES ('front end devloper',(SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'X' AND user_id =  (SELECT user_id FROM _USER WHERE UserName = 'guest')), (SELECT user_id FROM _USER WHERE UserName = 'guest'));

INSERT INTO _APPLICATION(job_title, company_id, user_id)
VALUES ('Program manager',(SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'X' AND user_id =  (SELECT user_id FROM _USER WHERE UserName = 'guest')), (SELECT user_id FROM _USER WHERE UserName = 'guest'));

INSERT INTO _APPLICATION(job_title, company_id, user_id)
VALUES ('back end developer',(SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'Spotify' AND user_id =  (SELECT user_id FROM _USER WHERE UserName = 'guest')), (SELECT user_id FROM _USER WHERE UserName = 'guest'));

INSERT INTO _APPLICATION(job_title, company_id, user_id)
VALUES ('software engineer',(SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'Rumble' AND user_id =  (SELECT user_id FROM _USER WHERE UserName = 'guest')), (SELECT user_id FROM _USER WHERE UserName = 'guest'));

INSERT INTO _APPLICATION(job_title, company_id, user_id)
VALUES ('Manager',(SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'Rumble' AND user_id =  (SELECT user_id FROM _USER WHERE UserName = 'guest')), (SELECT user_id FROM _USER WHERE UserName = 'guest'));

INSERT INTO _APPLICATION(job_title, company_id, user_id)
VALUES ('Sales rep',(SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'Rumble' AND user_id =  (SELECT user_id FROM _USER WHERE UserName = 'guest')), (SELECT user_id FROM _USER WHERE UserName = 'guest'));

INSERT INTO _APPLICATION(job_title, company_id, user_id)
VALUES ('back end developer',(SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'Pinterest' AND user_id =  (SELECT user_id FROM _USER WHERE UserName = 'guest')), (SELECT user_id FROM _USER WHERE UserName = 'guest'));

INSERT INTO _APPLICATION(job_title, company_id, user_id)
VALUES ('front end developer',(SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'Pinterest' AND user_id =  (SELECT user_id FROM _USER WHERE UserName = 'guest')), (SELECT user_id FROM _USER WHERE UserName = 'guest'));

INSERT INTO _APPLICATION(job_title, company_id, user_id)
VALUES ('Technical support engineer',(SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'Pinterest' AND user_id =  (SELECT user_id FROM _USER WHERE UserName = 'guest')), (SELECT user_id FROM _USER WHERE UserName = 'guest'));

INSERT INTO _APPLICATION(job_title, company_id, user_id)
VALUES ('production support specialist',(SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'META' AND user_id =  (SELECT user_id FROM _USER WHERE UserName = 'guest')), (SELECT user_id FROM _USER WHERE UserName = 'guest'));

INSERT INTO _APPLICATION(job_title, company_id, user_id)
VALUES ('software engineer',(SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'META' AND user_id =  (SELECT user_id FROM _USER WHERE UserName = 'guest')), (SELECT user_id FROM _USER WHERE UserName = 'guest'));

INSERT INTO _APPLICATION(job_title, company_id, user_id)
VALUES ('project manager',(SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'META' AND user_id =  (SELECT user_id FROM _USER WHERE UserName = 'guest')), (SELECT user_id FROM _USER WHERE UserName = 'guest'));

INSERT INTO _APPLICATION(job_title, company_id, user_id)
VALUES ('UI/UX design',(SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'META' AND user_id =  (SELECT user_id FROM _USER WHERE UserName = 'guest')), (SELECT user_id FROM _USER WHERE UserName = 'guest'));

INSERT INTO _APPLICATION(job_title, company_id, user_id)
VALUES ('Platform engineer',(SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'META' AND user_id =  (SELECT user_id FROM _USER WHERE UserName = 'guest')), (SELECT user_id FROM _USER WHERE UserName = 'guest'));

INSERT INTO _APPLICATION(job_title, company_id, user_id)
VALUES ('Head of cyber security',(SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'META' AND user_id =  (SELECT user_id FROM _USER WHERE UserName = 'guest')), (SELECT user_id FROM _USER WHERE UserName = 'guest'));