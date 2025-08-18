DROP TABLE IF EXISTS _CONTACT;

CREATE TYPE replystat AS ENUM ('replied', 'has not replied');


CREATE TABLE _CONTACT(
  contact_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL,
  user_id uuid NOT NULL,
  creation_date TIMESTAMPTZ DEFAULT Now(),
  last_updated TIMESTAMPTZ DEFAULT Now(),
  last_contacted TIMESTAMPTZ DEFAULT Now(),
  followup_reminder TIMESTAMPTZ,
  CONTACTNAME VARCHAR(255) NOT NULL,
  CONTACT_LINKEDIN VARCHAR(255),
  CONTACT_PHONE VARCHAR(255),
  CONTACT_EMAIL VARCHAR(255),
  reply_status replystat NOT NULL DEFAULT 'has not replied',
  FOLLOWUP BOOLEAN DEFAULT 'false',
  isprimary BOOLEAN DEFAULT 'false',
  CHECK (CONTACT_EMAIL LIKE '%.com%'),
  CHECK (CONTACT_LINKEDIN LIKE '%.com%'),
   FOREIGN KEY (company_id) REFERENCES _COMPANY(company_id)
 ON DELETE CASCADE,
 FOREIGN KEY (user_id) REFERENCES _USER(user_id)
 ON DELETE CASCADE
  );

INSERT INTO _CONTACT (CONTACTNAME, isprimary, company_id, user_id)
VALUES ('James Smith', true, (SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'GOOGLE' AND user_id = (SELECT user_id FROM _USER WHERE UserName = 'louisiscool123')), (SELECT user_id FROM _USER WHERE UserName = 'louisiscool123'));

INSERT INTO _CONTACT (CONTACTNAME, isprimary, company_id, user_id)
VALUES ('Frank Jones', true, (SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'Spotify' AND user_id = (SELECT user_id FROM _USER WHERE UserName = 'louisiscool123')), (SELECT user_id FROM _USER WHERE UserName = 'louisiscool123'));

INSERT INTO _CONTACT (CONTACTNAME, isprimary, company_id, user_id)
VALUES ('Judd Paul', true, (SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'Rumble' AND user_id = (SELECT user_id FROM _USER WHERE UserName = 'louisiscool123')), (SELECT user_id FROM _USER WHERE UserName = 'louisiscool123'));

INSERT INTO _CONTACT (CONTACTNAME, isprimary, company_id, user_id)
VALUES ('Dave Wilson', true, (SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'GOOGLE' AND user_id = (SELECT user_id FROM _USER WHERE UserName = 'louisiscool123')), (SELECT user_id FROM _USER WHERE UserName = 'louisiscool123'));

INSERT INTO _CONTACT (CONTACTNAME, isprimary, company_id, user_id)
VALUES ('Sara Jackson', true, (SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'Pinterest' AND user_id = (SELECT user_id FROM _USER WHERE UserName = 'SWerb')), (SELECT user_id FROM _USER WHERE UserName = 'SWerb'));

INSERT INTO _CONTACT (CONTACTNAME, isprimary, company_id, user_id)
VALUES ('Dave Lee', true, (SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'Rumble' AND user_id = (SELECT user_id FROM _USER WHERE UserName = 'SWerb')), (SELECT user_id FROM _USER WHERE UserName = 'SWerb'));

INSERT INTO _CONTACT (CONTACTNAME, isprimary, company_id, user_id)
VALUES ('Bob Davis', true, (SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'Rumble' AND user_id = (SELECT user_id FROM _USER WHERE UserName = 'SWerb')), (SELECT user_id FROM _USER WHERE UserName = 'SWerb'));

INSERT INTO _CONTACT (CONTACTNAME, isprimary, company_id, user_id)
VALUES ('Bob Davis', true, (SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'Rumble' AND user_id = (SELECT user_id FROM _USER WHERE UserName = 'guest')), (SELECT user_id FROM _USER WHERE UserName = 'guest'));


INSERT INTO _CONTACT (CONTACTNAME, isprimary, company_id, user_id)
VALUES ('James Smith', true, (SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'GOOGLE' AND user_id = (SELECT user_id FROM _USER WHERE UserName = 'guest')), (SELECT user_id FROM _USER WHERE UserName = 'guest') );

INSERT INTO _CONTACT (CONTACTNAME, isprimary, company_id, user_id)
VALUES ('Frank Jones', true, (SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'Spotify' AND user_id = (SELECT user_id FROM _USER WHERE UserName = 'guest')), (SELECT user_id FROM _USER WHERE UserName = 'guest') );

INSERT INTO _CONTACT (CONTACTNAME, isprimary, company_id, user_id)
VALUES ('Sara Jackson', true, (SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'Pinterest' AND user_id = (SELECT user_id FROM _USER WHERE UserName = 'guest')), (SELECT user_id FROM _USER WHERE UserName = 'guest'));

INSERT INTO _CONTACT (CONTACTNAME, isprimary, company_id, user_id)
VALUES ('Anna Jackson', true, (SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'Pinterest' AND user_id = (SELECT user_id FROM _USER WHERE UserName = 'guest')), (SELECT user_id FROM _USER WHERE UserName = 'guest'));

INSERT INTO _CONTACT (CONTACTNAME, isprimary, company_id, user_id)
VALUES ('Chad Johnson', true, (SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'Pinterest' AND user_id = (SELECT user_id FROM _USER WHERE UserName = 'guest')), (SELECT user_id FROM _USER WHERE UserName = 'guest'));

INSERT INTO _CONTACT (CONTACTNAME, isprimary, company_id, user_id)
VALUES ('Dave Lee', true, (SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'Rumble' AND user_id = (SELECT user_id FROM _USER WHERE UserName = 'guest')), (SELECT user_id FROM _USER WHERE UserName = 'guest'));

