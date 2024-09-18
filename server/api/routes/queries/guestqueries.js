export const selectIdForGuest =
  "SELECT user_id, FIRST_NAME, LAST_NAME, User_email, UserName FROM _USER WHERE USERNAME = 'guest'";

export const getAllGuestApplications = `
SELECT _COMPANY.company_id, _COMPANY.companyname as COMPANY,
json_agg(
DISTINCT 
jsonb_build_object(
    'Position', 
    _APPLICATION.job_title, 
    'Application_ID', 
    _APPLICATION.applied_id, 
    'Company_Website',
    _APPLICATION.website,
    'Applied_Date', 
    _APPLICATION.creation_date)) as APPLICATIONS,
CASE 
WHEN 
_CONTACT.company_id = _COMPANY.company_id AND _CONTACT.user_id = $1
THEN 
json_agg(
DISTINCT 
jsonb_build_object(
    'CONTACT_ID', 
    _CONTACT.contact_id, 
    'CONTACT_NAME', 
    _CONTACT.contactname)) END as CONTACTS,
CASE 
WHEN 
CONTACT_PAST_JOB.company_id = _COMPANY.company_id AND CONTACT_PAST_JOB.user_id = $1
THEN 
json_agg(
DISTINCT 
jsonb_build_object(
    'CONTACT_NAME', 
    CONTACT_PAST_JOB.contactname, 
    'CONTACT_ID', 
    CONTACT_PAST_JOB.contact_id)) 
END as Past_Job_Contacts
FROM _COMPANY
JOIN _APPLICATION ON
_APPLICATION.company_id = _COMPANY.company_id
LEFT JOIN _CONTACT ON
_COMPANY.company_id = _CONTACT.company_id AND _APPLICATION.user_id = _CONTACT.user_id
LEFT JOIN CONTACT_PAST_JOB ON
_COMPANY.company_id = CONTACT_PAST_JOB.company_id AND _APPLICATION.user_id = CONTACT_PAST_JOB.user_id
WHERE _APPLICATION.user_id = $1
GROUP BY 
_COMPANY.company_id,  
_application.company_id, 
_contact.company_id, 
_contact.user_id, 
contact_past_job.company_id, 
contact_past_job.user_id
`;
