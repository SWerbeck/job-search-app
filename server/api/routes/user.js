const router = require('express').Router();
const { client } = require('../../db/db.js');

// const getUsers = () => {
//   return new Promise((resolve, reject) => {
//     client.query(
//       'SELECT * FROM _USER ORDER BY USER_ID ASC',
//       (error, results) => {
//         if (error) {
//           throw error;
//         }
//         return resolve(results.rows);
//       }
//     );
//   });
// };

// router.get('/', async (request, response) => {
//   try {
//     const users = await getUsers();
//     response.send(users);
//   } catch (error) {
//     console.log(error);
//   }
// });

// ABOVE WORKS - Stephen and I figured this out on monday 2/5.

// Below also works. Concerning to me that there is no async/await
// or any types of promises needing to be used.

const allUsers = 'SELECT * FROM _USER ORDER BY USER_ID ASC';

const getUsers = (request, response) => {
  client.query(allUsers, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

router.get('/', getUsers);

module.exports = router;
