import express from 'express';
import pool from '../../db/db.js';

const router = express.Router();


// Get all applications
router.get('/', async (req, res) => {
    try {
      const applications = await pool.query(
        'SELECT * FROM _APPLICATION ORDER BY user_id ASC'
      );
      res.json({ applications: applications.rows });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });



  // Get individual application by id
router.get('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const singleApp = await pool.query(
        'SELECT * FROM _APPLICATION WHERE applied_id = $1',
        [id]
      );
      res.json({ application: singleApp.rows });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


// Post Application
router.post('/', async (req, res) => {
    try {
      const { company_id, user_id, application_info } = req.body;
      const newApplication = await pool.query(
        'INSERT INTO _APPLICATION (company_id, user_id, application_info ) VALUES ($1, $2, $3) RETURNING *',
        [company_id, user_id, application_info]
      );
      res.json({ application: newApplication.rows[0] });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });










export default router;
