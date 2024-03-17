import express from 'express';
import pool from '../../db/db.js';

const router = express.Router();

// Get all companies
router.get('/', async (req, res) => {
  try {
    const companies = await pool.query(
      'SELECT * FROM _COMPANY ORDER BY company_id ASC'
    );
    res.json({ companies: companies.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get company by id
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const singleCompany = await pool.query(
      'SELECT * FROM _COMPANY WHERE company_id = $1',
      [id]
    );
    res.json({ users: singleCompany.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Post Company
router.post('/', async (req, res) => {
  try {
    const { companyName, website } = req.body;
    const newUser = await pool.query(
      'INSERT INTO _COMPANY (COMPANYNAME, WEBSITE ) VALUES ($1, $2) RETURNING *',
      [companyName, website]
    );
    res.json({ users: newUser.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Put Company
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { companyName, website } = req.body;
    const updatedCompany = await pool.query(
      'UPDATE _COMPANY SET COMPANYNAME = $1, WEBSITE = $2 WHERE company_id = $3',
      [companyName, website, id]
    );
    res.status(200).send(`Updated info for: ${companyName}`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Delete Company
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    //query to get id passed from req.params.id
    const singleCompanyQuery = await pool.query(
      'SELECT COMPANY_ID FROM _COMPANY WHERE company_ID = $1',
      [id]
    );
    //getting that value and storing it into a variable
    const singleCompanyId = singleCompanyQuery.rows[0].company_id;
    //check if the query matches the req.params.id || if so delete that company
    if (singleCompanyId === id) {
      const deleteSingleCompany = await pool.query(
        'DELETE FROM _COMPANY WHERE company_id = $1',
        [id]
      );
      res.status(200).send(`company deleted with ID: ${id}`);
    }
  } catch (error) {
    res.status(500).json({ error: 'no company in db with this id' });
  }
});

export default router;
