import express from 'express';
import bcrypt from 'bcrypt';
import pool from '../../db/db.js';

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await pool.query('SELECT * FROM _user');
    res.json({ users: users.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user by id
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const singleUser = await pool.query(
      'SELECT * FROM _USER WHERE USER_ID = $1',
      [id]
    );
    res.json({ users: singleUser.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// post new user
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, user_password, email, userName } = req.body;
    //hashed pw function
    const hashedPassword = await bcrypt.hash(user_password, 10);
    const newUser = await pool.query(
      'INSERT INTO _USER (FIRST_NAME, LAST_NAME, USER_PASSWORD, User_email, UserName ) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [firstName, lastName, hashedPassword, email, userName]
    );
    res.json({ users: newUser.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//PUT route
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { firstName, lastName, email, userName } = req.body;
    //hashed pw function
    //const hashedPassword = await bcrypt.hash(req.body.user_password, 10);
    const updatedUser = await pool.query(
      'UPDATE _USER SET FIRST_NAME = $1, LAST_NAME = $2, User_email = $3, UserName = $4 WHERE user_id = $5',
      [firstName, lastName, email, userName, id]
    );
    res.status(200).send(`Updated info for: ${userName}`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// delete route
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const singleUser = await pool.query(
      'SELECT USER_ID FROM _USER WHERE USER_ID = $1',
      [id]
    );
    if (singleUser.rows[0].user_id === id) {
      const deleteSingleUser = await pool.query(
        'DELETE FROM _USER WHERE user_id = $1',
        [id]
      );
      res.status(200).send(`User deleted with ID: ${id}`);
    }
  } catch (error) {
    res.status(500).json({ error: 'no user in db with this id' });
  }
});

export default router;
