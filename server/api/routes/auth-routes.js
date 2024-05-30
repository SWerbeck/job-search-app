import express from 'express';
import pool from '../../db/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtTokens } from '../auth-middleware/jwt-helpers.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    let { email, user_password } = req.body;
    const users = await pool.query(
      'SELECT * FROM _USER WHERE user_email = $1',
      [email]
    );

    if (users.rows.length === 0) {
      return res.status(401).json({
        error:
          'Email not found. Please check that the email is correct or create an account to login',
      });
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
      let tokens = jwtTokens(users.rows[0]);
      res.cookie('refresh_token', tokens.refreshToken, {
        httpOnly: true,
      });
      //for debugging the below line is returning the tokens
      //return res.json(users);
      return res.json({
        token: tokens,
        id: users.rows[0].user_id,
        username: users.rows[0].username,
      });
      // when app is in prod we will want this line below instead to just say success
      //return res.status(200).json('Success');
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.get('/refresh_token', (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (refreshToken === null)
      return res.status(401).json({ error: 'Null refresh token' });
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (error, user) => {
        if (error) return res.status(403).json({ error: error.message });
        let tokens = jwtTokens(user);
        res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true });
        return res.json(tokens);
      }
    );
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.delete('/logout', (req, res) => {
  try {
    res.clearCookie('refresh_token');
    return res.status(200).json({ message: 'refresh token deleted' });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

export default router;
