export const selectAllApplications =
  'SELECT * FROM _APPLICATION ORDER BY user_id ASC';

export const selectApplicationById =
  'SELECT * FROM _APPLICATION WHERE applied_id = $1';

export const getAllUserApplications = `
  SELECT _COMPANY.company_id, _COMPANY.companyname as COMPANY,
  json_agg(
  DISTINCT
  jsonb_build_object(
      'Position',
      _APPLICATION.job_title,
      'company_id',
      _COMPANY.company_id,
      'company_name',
      _COMPANY.companyname,
      'Application_ID',
      _APPLICATION.applied_id,
      'Company_Website',
      _APPLICATION.website,
      'Status',
      _APPLICATION.application_status,
      'Applied_Date',
      _APPLICATION.creation_date,
      'Last_Updated_Date',
      _APPLICATION.last_updated,
      'application_info',
      _APPLICATION.application_info
     )) as APPLICATIONS,
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
      _CONTACT.contactname,
      'COMPANY_ID',
      _CONTACT.company_id)) END as CONTACTS,
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

export const postNewApplication =
  'INSERT INTO _APPLICATION (job_title, company_id, user_id, application_info) VALUES ($1, $2, $3, $4) RETURNING *';

// export const editApplicationById =
//   "UPDATE _APPLICATION SET job_title = $1, company_id = $2, application_info = $3, application_status = $4 WHERE applied_id = $5";

export const editApplicationById =
  'UPDATE _APPLICATION SET job_title = $1 WHERE applied_id = $2';

export const singleApplicationById =
  'SELECT applied_id FROM _APPLICATION WHERE applied_id = $1';

export const deleteApplicationById =
  'DELETE FROM _APPLICATION WHERE applied_id = $1';
