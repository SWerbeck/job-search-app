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