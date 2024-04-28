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
VALUES ((SELECT contact_id FROM _CONTACT WHERE CONTACTNAME in ('Judd Paul')), (SELECT company_id FROM _COMPANY WHERE COMPANYNAME in ('GOOGLE')), (SELECT user_id FROM _USER WHERE UserName in ('louisiscool123')));