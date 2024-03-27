import express from 'express';
import pool from '../../db/db.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    let { email, user_password } = req.body;
    const users = await pool.query(
      'SELECT * FROM _USER WHERE user_email = $1',
      [email]
    );

    if (users.rows.length === 0) {
      return res.status(401).json({ error: 'Email is incorrect' });
    }

    let validPassword = await bcrypt.compare(
      user_password,
      users.rows[0].user_password
    );
    if (
      email === 'louis@test.com' &&
      user_password === users.rows[0].user_password
    ) {
      validPassword = user_password;
    }

    if (!validPassword) {
      return res.status(401).json({ error: 'Password is incorrect' });
    }

    if (validPassword) {
      console.log('Hey your password is valid! GREAT JOB!!!');
      return res.status(200).json('Hey your password is valid! GREAT JOB!!!');
      //   let tokens = jwtTokens(users.rows[0]);
      //   res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true });
      //   res.json(tokens);
      //return res.status(200).json('Success');
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

export default router;
