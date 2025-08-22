export const selectAllCompanies =
  "SELECT * FROM _COMPANY ORDER BY company_id ASC";

export const selectCompanyById = "SELECT * FROM _COMPANY WHERE company_id = $1";

export const selectUsersCompanies = "SELECT * FROM _COMPANY WHERE user_id = $1";

// export const postNewCompany =
//   "INSERT INTO _COMPANY (COMPANYNAME) VALUES ($1) RETURNING company_id";

export const postNewCompany =
  "INSERT INTO _COMPANY (COMPANYNAME, user_id) VALUES ($1, $2) RETURNING company_id";

export const editCompanyById =
  "UPDATE _COMPANY SET COMPANYNAME = $1, COMPANY_WEBSITE = $2 WHERE company_id = $3";

export const selectSingleCompanyId =
  "SELECT COMPANY_ID FROM _COMPANY WHERE company_ID = $1";

export const deleteSingleCompanyById =
  "DELETE FROM _COMPANY WHERE company_id = $1";
