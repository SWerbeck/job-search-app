DROP TABLE IF EXISTS _CONTACT;

CREATE TYPE reply_stat AS ENUM ('replied', 'has not replied');


CREATE TABLE _CONTACT(
  contact_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL,
  user_id uuid NOT NULL,
  creation_date TIMESTAMPTZ DEFAULT Now(),
  last_updated TIMESTAMPTZ DEFAULT Now(),
  last_contacted TIMESTAMPTZ DEFAULT Now(),
  followup_reminder TIMESTAMPTZ,
  past_job uuid[] DEFAULT null,
  CONTACTNAME VARCHAR(255) NOT NULL,
  CONTACT_LINKEDIN VARCHAR(255),
  CONTACT_PHONE VARCHAR(255),
  CONTACT_EMAIL VARCHAR(255),
  reply_status reply_stat NOT NULL DEFAULT 'has not replied',
  FOLLOWUP BOOLEAN DEFAULT 'false',
  CHECK (CONTACT_EMAIL LIKE '%.com%'),
  CHECK (CONTACT_LINKEDIN LIKE '%.com%'),
   FOREIGN KEY (company_id) REFERENCES _COMPANY(company_id)
 ON DELETE CASCADE,
 FOREIGN KEY (user_id) REFERENCES _USER(user_id)
 ON DELETE CASCADE
  );

INSERT INTO _CONTACT (CONTACTNAME, company_id, user_id)
VALUES ('James Smith',(SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'GOOGLE'), (SELECT user_id FROM _USER WHERE UserName = 'louisiscool123') );

INSERT INTO _CONTACT (CONTACTNAME, company_id, user_id)
VALUES ('Frank Jones',(SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'Spotify'), (SELECT user_id FROM _USER WHERE UserName = 'louisiscool123'));

INSERT INTO _CONTACT (CONTACTNAME, company_id, user_id)
VALUES ('Judd Paul',(SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'Rumble'), (SELECT user_id FROM _USER WHERE UserName = 'louisiscool123'));

INSERT INTO _CONTACT (CONTACTNAME, company_id, user_id)
VALUES ('Sara Jackson',(SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'Pinterest'), (SELECT user_id FROM _USER WHERE UserName = 'SWerb') );

INSERT INTO _CONTACT (CONTACTNAME, company_id, user_id)
VALUES ('Dave Lee',(SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'Rumble'), (SELECT user_id FROM _USER WHERE UserName = 'SWerb') );

INSERT INTO _CONTACT (CONTACTNAME, company_id, user_id)
VALUES ('Bob Davis',(SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'Rumble'), (SELECT user_id FROM _USER WHERE UserName = 'SWerb'));

INSERT INTO _CONTACT (CONTACTNAME, company_id, user_id)
VALUES ('Bob Davis',(SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'Rumble'), (SELECT user_id FROM _USER WHERE UserName = 'guest'));


INSERT INTO _CONTACT (CONTACTNAME, company_id, user_id)
VALUES ('James Smith',(SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'GOOGLE'), (SELECT user_id FROM _USER WHERE UserName = 'guest') );

INSERT INTO _CONTACT (CONTACTNAME, company_id, user_id)
VALUES ('Frank Jones',(SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'Spotify'), (SELECT user_id FROM _USER WHERE UserName = 'guest') );

INSERT INTO _CONTACT (CONTACTNAME, company_id, user_id)
VALUES ('Sara Jackson',(SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'Pinterest'), (SELECT user_id FROM _USER WHERE UserName = 'guest'));

INSERT INTO _CONTACT (CONTACTNAME, company_id, user_id)
VALUES ('Dave Lee',(SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'Rumble'), (SELECT user_id FROM _USER WHERE UserName = 'guest'));

DROP TABLE IF EXISTS CONTACT_PAST_JOB;

CREATE TABLE CONTACT_PAST_JOB(
  contact_past_job_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id uuid NOT NULL,
  company_id uuid NOT NULL,
  user_id uuid NOT NULL,
  FOREIGN KEY (user_id) REFERENCES _USER(user_id)
  ON DELETE CASCADE,
  FOREIGN KEY (company_id) REFERENCES _COMPANY(company_id)
  ON DELETE CASCADE,
  FOREIGN KEY (contact_id) REFERENCES _CONTACT(contact_id)
  ON DELETE CASCADE
  );

INSERT INTO CONTACT_PAST_JOB (contact_id, company_id, user_id)
VALUES ((SELECT contact_id FROM _CONTACT WHERE CONTACTNAME in ('Frank Jones') LIMIT 1),(SELECT company_id FROM _COMPANY WHERE COMPANYNAME in ('GOOGLE')), (SELECT user_id FROM _USER WHERE UserName in ('louisiscool123' )));