DROP TABLE IF EXISTS _AppliedCompany;

CREATE TABLE _AppliedCompany(
 ID INT PRIMARY KEY NOT NULL,
 company_id int NOT NULL,
 user_id uuid NOT NULL,
 FOREIGN KEY (company_id) REFERENCES _COMPANY(ID)
 ON DELETE CASCADE,
 FOREIGN KEY (user_id) REFERENCES _USER(user_id)
 --ON DELETE CASCADE
);

-- ALTER TABLE _AppliedCompany
-- ADD COLUMN user_id uuid;

-- ALTER TABLE _AppliedCompany 
--    --ADD CONSTRAINT fk_someName
--    FOREIGN KEY (user_id) 
--    REFERENCES _USER(user_id);

INSERT INTO _AppliedCompany(ID, company_id, user_id)
VALUES (1, 1, (SELECT user_id FROM _USER WHERE FIRST_NAME = 'Stephen'));


-- INSERT INTO _AppliedCompany(ID, company_id, user_id)
-- VALUES (2, 3, 1);

-- INSERT INTO _AppliedCompany(ID, company_id, user_id)
-- VALUES (3, 7, 1);

-- INSERT INTO _AppliedCompany(ID, company_id, user_id)
-- VALUES (4, 2, 2);

-- INSERT INTO _AppliedCompany(ID, company_id, user_id)
-- VALUES (5, 6, 2);