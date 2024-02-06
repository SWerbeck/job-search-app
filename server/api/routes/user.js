const router = require('express').Router();
const client = require('../../db/db.js');

router.get('/', (request, response) => {
  response.json({ info: 'Got the routes!!!' });
});
// const getUsers = (request, response) => {
//   client.query('SELECT * FROM _USER ORDER BY id ASC', (error, results) => {
//     if (error) {
//       throw error;
//     }
//     response.status(200).json(results.rows);
//   });
// };

// router.get('/users', (req, res, next) => {
//   const getUsers = client.query(
//     'SELECT * FROM _USER ORDER BY id ASC',
//     (error, res) => {
//       if (error) {
//         throw error;
//       }
//       res.status(200).json(res.rows);
//     }
//   );
// });

// const getUsers = (request, response) => {
//   client.query('SELECT * FROM _USER ORDER BY id ASC', (error, results) => {
//     if (error) {
//       throw error;
//     }
//     response.status(200).json(results.rows);
//   });
// };

module.exports = router;
