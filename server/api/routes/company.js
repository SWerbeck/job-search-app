const router = require('express').Router();
const { client } = require('../../db/db.js');

//Get route for all companies
const allCompanies = 'SELECT * FROM _COMPANY ORDER BY company_id ASC';

const getCompanies = (req, res) => {
  client.query(allCompanies, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

router.get('/', getCompanies);

// Get route for single company by id
const singleCompany = 'SELECT * FROM _COMPANY WHERE company_id = $1';

const getCompanyById = (req, res) => {
  const id = req.params.id;

  client.query(singleCompany, [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};
router.get('/:id', getCompanyById);

// Post Company
const postCompany =
  'INSERT INTO _COMPANY (COMPANYNAME, WEBSITE) VALUES ($1, $2) RETURNING *';

const createCompany = (req, res) => {
  const { companyName, website } = req.body;

  client.query(postCompany, [companyName, website], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(201).send(`Company added with Name: ${companyName}`);
  });
};

router.post('/', createCompany);

// Put Company
const putCompany =
  'UPDATE _COMPANY SET COMPANYNAME = $1, WEBSITE = $2 WHERE company_id = $3';

const updateCompany = (req, res) => {
  const id = req.params.id;
  const { companyName, website } = req.body;

  client.query(putCompany, [companyName, website, id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`User modified with ID: ${id}`);
  });
};

router.put('/:id', updateCompany);

//Delete Company

const deleteSingleCompany = 'DELETE FROM _COMPANY WHERE company_id = $1';

const deleteCompany = (req, res) => {
  const id = req.params.id;

  client.query(deleteSingleCompany, [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`Company deleted with ID: ${id}`);
  });
};

router.delete('/:id', deleteCompany);

module.exports = router;
