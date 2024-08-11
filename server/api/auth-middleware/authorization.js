import jwt from 'jsonwebtoken';

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization']; //Bearer TOKEN
//   const token = authHeader && authHeader.split(' ')[1];
//   // why does only 2 == work but 3 === doesn't?
//   if (token == null) return res.status(401).json({ error: 'No token' });
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
//     req.authenticated = true;
//     if (error) return res.status(403).json({ error: error.message });
//     req.user = user;
//     next();
//   });
// }

// export { authenticateToken };

const verifyJWT = (req, res, next) => {
  // const authHeader = req.headers.authorization || req.headers.Authorization;
  // const token = req.headers['authorization'];

  const authHeader = req.headers['authorization']; //Bearer TOKEN
  const token = authHeader && authHeader.split(' ')[1];
  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
  //const token = authHeader.split(' ')[1];
  // const token = req.headers['authorization'];
  // console.log('verify jwt?', token); //Bearer Token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); //invalid token
    req.user = decoded.UserInfo.email;
    //req.roles = decoded.UserInfo.roles;
    next();
  });
};

export default verifyJWT;
