DROP TABLE IF EXISTS CONTACT_PAST_JOB;


CREATE TABLE CONTACT_PAST_JOB(
  contact_past_job_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  company_id uuid NOT NULL,
  contact_id uuid NOT NULL,
  CONTACTNAME VARCHAR(255) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES _USER(user_id)
  ON DELETE CASCADE,
  FOREIGN KEY (company_id) REFERENCES _COMPANY(company_id)
  ON DELETE CASCADE,
  FOREIGN KEY (contact_id) REFERENCES _CONTACT(contact_id)
  ON DELETE CASCADE
  );


 INSERT INTO CONTACT_PAST_JOB (contact_id, company_id, user_id, CONTACTNAME)
 VALUES ((SELECT contact_id FROM _CONTACT WHERE CONTACTNAME in ('Judd Paul') AND user_id in (SELECT user_id FROM _USER WHERE UserName in ('louisiscool123'))), (SELECT company_id FROM _COMPANY WHERE COMPANYNAME in ('GOOGLE') AND user_id = (SELECT user_id FROM _USER WHERE UserName = 'louisiscool123')), (SELECT user_id FROM _USER WHERE UserName in ('louisiscool123')), 'Judd Paul');

INSERT INTO CONTACT_PAST_JOB (contact_id, company_id, user_id, CONTACTNAME)
VALUES ((SELECT contact_id FROM _CONTACT WHERE CONTACTNAME in ('Dave Lee') AND user_id in (SELECT user_id FROM _USER WHERE UserName in ('SWerb'))), (SELECT company_id FROM _COMPANY WHERE COMPANYNAME in ('Pinterest') AND user_id = (SELECT user_id FROM _USER WHERE UserName = 'guest')), (SELECT user_id FROM _USER WHERE UserName in ('SWerb')), 'Dave Lee');
