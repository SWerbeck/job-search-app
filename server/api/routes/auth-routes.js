import express from 'express';
import pool from '../../db/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtTokens } from '../auth-middleware/jwt-helpers.js';

const router = express.Router();

// router.post('/login', async (req, res) => {
//   try {
//     let { email, user_password } = req.body;
//     const users = await pool.query(
//       'SELECT * FROM _USER WHERE user_email = $1',
//       [email]
//     );

//     if (users.rows.length === 0) {
//       return res.status(401).json({
//         error:
//           'Email not found. Please check that the email is correct or create an account to login',
//       });
//     }

//     let validPassword = await bcrypt.compare(
//       user_password,
//       users.rows[0].user_password
//     );
//     if (
//       email === 'louis@test.com' &&
//       user_password === users.rows[0].user_password
//     ) {
//       validPassword = user_password;
//     }

//     if (
//       email === 'steve@gmail.com' &&
//       user_password === users.rows[0].user_password
//     ) {
//       validPassword = user_password;
//     }

//     if (!validPassword) {
//       return res.status(401).json({ error: 'Password is incorrect' });
//     }

//     if (validPassword) {
//       let tokens = jwtTokens(users.rows[0]);
//       res.cookie('refresh_token', tokens.refreshToken, {
//         httpOnly: true,
//       });
//       //for debugging the below line is returning the tokens
//       //return res.json(users);
//       return res.json({
//         token: tokens,
//         id: users.rows[0].user_id,
//         username: users.rows[0].username,
//         roles: [users.rows[0].roles],
//       });
//       // when app is in prod we will want this line below instead to just say success
//       //return res.status(200).json('Success');
//     }
//   } catch (error) {
//     res.status(401).json({ error: error.message });
//   }
// });

// router.get('/refresh_token', (req, res) => {
//   try {
//     const refreshToken = req.cookies.refresh_token;
//     console.log('from route', refreshToken);
//     if (refreshToken === null)
//       return res.status(401).json({ error: 'Null refresh token' });
//     jwt.verify(
//       refreshToken,
//       process.env.REFRESH_TOKEN_SECRET,
//       (error, user) => {
//         if (error) return res.status(403).json({ error: error.message });
//         let tokens = jwtTokens(user);
//         res.cookie('refresh_token', tokens.refreshToken, {
//           httpOnly: true,
//           secure: true,
//           sameSite: 'None',
//         });
//         return res.json(tokens);
//       }
//     );
//   } catch (error) {
//     res.status(401).json({ error: error.message });
//   }
// });

// router.delete('/logout', (req, res) => {
//   try {
//     res.clearCookie('refresh_token');
//     return res.status(200).json({ message: 'refresh token deleted' });
//   } catch (error) {
//     res.status(401).json({ error: error.message });
//   }
// });

// LOGIN FROM NEW BUILT BACKEND
router.post('/login', async (req, res) => {
  const { email, user_password } = req.body;
  if (!email || !user_password)
    return res.status(400).json({ message: 'Email and password are required' });
  const foundUser = await pool.query(
    'SELECT * FROM _USER WHERE user_email = $1',
    [email]
  );
  if (!email) return res.sendStatus(401); //Unauthorized
  // evaluate pw
  let match = await bcrypt.compare(
    user_password,
    foundUser.rows[0].user_password
  );
  if (
    email === 'louis@test.com' &&
    user_password === foundUser.rows[0].user_password
  ) {
    match = user_password;
  }
  if (match) {
    //const roles = Object.values(foundUser.rows[0].roles);
    // creating JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: foundUser.rows[0].email,
          //roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30s' }
    );
    const refreshToken = jwt.sign(
      { email: foundUser.rows[0].email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '30s' }
    );
    // Saving refreshToken with current user
    //foundUser.rows[0].refreshtoken = refreshToken;
    // update db
    const result = await pool.query(
      `UPDATE _USER SET refreshtoken = $1 WHERE USER_ID = $2`,
      [refreshToken, foundUser.rows[0].user_id]
    );
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000,
    }); //take out secure: true for testing with postman/thunderclient, but need to be put back in
    res.json({
      accessToken,
      id: foundUser.rows[0].user_id,
      username: foundUser.rows[0].username,
      roles: [foundUser.rows[0].roles],
    });
  } else {
    res.sendStatus(401);
  }
});

// REFRESH FROM NEW BUILT BACKEND
router.get('/refresh_token', async (req, res) => {
  const cookies = req.cookies;
  console.log('cookies???', cookies);
  if (!cookies?.jwt) {
    console.log('hit 401 in refresh route');
    return res.sendStatus(401);
  }

  const refreshToken = cookies.jwt;
  console.log('token from refresh route', refreshToken);
  //checking the refresh token from cookie against the DB
  // const foundUser = await User.findOne({ refreshToken }).exec();
  const foundUser = await pool.query(
    'SELECT refreshtoken FROM _USER WHERE refreshtoken = $1',
    [refreshToken]
  );
  if (!foundUser) return res.sendStatus(403); //Forbidden
  // evaluate JWT
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username)
      return res.sendStatus(403);
    //const roles = Object.values(foundUser.rows[0].roles);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: decoded.username,
          //roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30s' }
    );
    res.json({ accessToken });
  });
});

// LOGOUT FROM NEW BUILT BACKEND
router.get('/logout', async (req, res) => {
  // On front end will need to delete the accessToken
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(204);
  } // No content
  const refreshToken = cookies.jwt;
  console.log('token from logout', refreshToken);

  // Is refreshToken in the DB?
  const foundUser = await pool.query(
    'SELECT * FROM _USER WHERE refreshtoken = $1',
    [refreshToken]
  );
  console.log('this is from logout', foundUser);
  if (!foundUser) {
    /* clear whatever it is called. In this case jwt
    also need to pass the same options it was set as, otherwise wont work. 
    max age does not need to be there and is 1 exception */
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.sendStatus(204); //Forbidden
  }
  // Delete refreshToken in DB
  // foundUser.rows[0].refreshtoken = '';
  const result = await pool.query(
    `UPDATE _USER SET refreshtoken = null WHERE USER_ID = $1`,
    [foundUser.rows[0].user_id]
  );
  // clear the jwt below
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }); //secure: true
  res.sendStatus(204);
});

export default router;
