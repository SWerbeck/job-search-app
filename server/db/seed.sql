DROP TABLE IF EXISTS _AppliedCompany;

CREATE TABLE _AppliedCompany(
 applied_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 company_id uuid NOT NULL,
 user_id uuid NOT NULL,
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

INSERT INTO _AppliedCompany(company_id, user_id)
VALUES ((SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'GOOGLE'), (SELECT user_id FROM _USER WHERE UserName = 'louisiscool123'));

INSERT INTO _AppliedCompany(company_id, user_id)
VALUES ((SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'Spotify'), (SELECT user_id FROM _USER WHERE UserName = 'louisiscool123'));

INSERT INTO _AppliedCompany(company_id, user_id)
VALUES ((SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'X'), (SELECT user_id FROM _USER WHERE UserName = 'louisiscool123'));

INSERT INTO _AppliedCompany(company_id, user_id)
VALUES ((SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'Data-Dog'), (SELECT user_id FROM _USER WHERE UserName = 'louisiscool123'));

INSERT INTO _AppliedCompany(company_id, user_id)
VALUES ((SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'Pinterest'), (SELECT user_id FROM _USER WHERE UserName = 'SWerb'));

INSERT INTO _AppliedCompany(company_id, user_id)
VALUES ((SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'Shopify'), (SELECT user_id FROM _USER WHERE UserName = 'SWerb'));

INSERT INTO _AppliedCompany(company_id, user_id)
VALUES ((SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'Rumble'), (SELECT user_id FROM _USER WHERE UserName = 'SWerb'));

INSERT INTO _AppliedCompany(company_id, user_id)
VALUES ((SELECT company_id FROM _COMPANY WHERE COMPANYNAME = 'GOOGLE'), (SELECT user_id FROM _USER WHERE UserName = 'SWerb'));

