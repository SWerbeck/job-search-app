export const selectAllContacts = 'SELECT * FROM _CONTACT';

export const selectContactById = 'SELECT * FROM _CONTACT WHERE contact_id = $1';

export const getContactByUserId = `
SELECT CONTACT.*, 
(SELECT COMPANYNAME 
    FROM _COMPANY 
    WHERE CONTACT.company_id = _COMPANY.company_id) AS Companyname,
CASE 
WHEN past_job.contact_id = CONTACT.contact_id 
THEN
json_agg(
    DISTINCT jsonb_build_object(
    'COMPANY', 
    (SELECT COMPANYNAME 
    FROM _COMPANY 
    WHERE _COMPANY.company_id = past_job.company_id),
    'COMPANY ID', past_job.company_id)) 
END as Past_Jobs
FROM _CONTACT AS CONTACT
LEFT JOIN CONTACT_PAST_JOB AS past_job 
ON CONTACT.contact_id = past_job.contact_id
WHERE CONTACT.user_id = $1
GROUP BY contact.contact_id, past_job.contact_id`;

export const postNewContact = `INSERT INTO _CONTACT (
    company_id, 
    user_id, 
    CONTACTNAME, 
    CONTACT_LINKEDIN, 
    CONTACT_PHONE, 
    CONTACT_EMAIL, 
    FOLLOWUP) 
    VALUES (
        $1, 
        $2, 
        $3, 
        $4, 
        $5, 
        $6, 
        $7 ) RETURNING *`;

export const editContactById = `UPDATE _CONTACT SET 
 company_id = $1, 
 CONTACTNAME = $2, 
 CONTACT_LINKEDIN = $3, 
 CONTACT_PHONE = $4, 
 CONTACT_EMAIL = $5, 
 FOLLOWUP = $6
 WHERE contact_id = $7`;

export const selectSingleByContactId = `SELECT contact_id FROM _CONTACT WHERE contact_id = $1`;

export const deleteContactById = 'DELETE FROM _CONTACT WHERE contact_id = $1';
