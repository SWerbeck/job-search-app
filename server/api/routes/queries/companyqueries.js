export const selectAllCompanies =
  'SELECT * FROM _COMPANY ORDER BY company_id ASC';

export const selectCompanyById = 'SELECT * FROM _COMPANY WHERE company_id = $1';

export const postNewCompany =
  'INSERT INTO _COMPANY (COMPANYNAME, WEBSITE ) VALUES ($1, $2) RETURNING *';

export const editCompanyById =
  'UPDATE _COMPANY SET COMPANYNAME = $1, WEBSITE = $2 WHERE company_id = $3';

export const selectSingleCompanyId =
  'SELECT COMPANY_ID FROM _COMPANY WHERE company_ID = $1';

export const deleteSingleCompanyById =
  'DELETE FROM _COMPANY WHERE company_id = $1';
