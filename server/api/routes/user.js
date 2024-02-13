const router = require("express").Router();
const { client } = require("../../db/db.js");

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

const allUsers = "SELECT * FROM _USER ORDER BY USER_ID ASC";

const getUsers = (req, res) => {
  client.query(allUsers, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

router.get("/", getUsers);

// Get user by id
const singleUser = "SELECT * FROM _USER WHERE USER_ID = $1";

const getUserById = (req, res) => {
  const id = req.params.id;

  client.query(singleUser, [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};
router.get("/:id", getUserById);

// Post user

const createUser = (req, res) => {
  const { firstName, lastName, email, userName } = req.body;

  client.query(
    "INSERT INTO _USER (FIRST_NAME, LAST_NAME, User_email, UserName ) VALUES ($1, $2, $3, $4) RETURNING *",
    [firstName, lastName, email, userName],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`User added with ID: ${results.rows[0].id}`);
    }
  );
};

router.post("/", createUser);

//PUT route 

const updateUser = (req, res) => {
  const id = req.params.id
  const { firstName, lastName, email, userName } = req.body

  client.query(
    'UPDATE _USER SET FIRST_NAME = $1, LAST_NAME = $2, User_email = $3, UserName = $4  WHERE user_id = $5',
    [firstName, lastName, email, userName, id],
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

router.put('/:id', updateUser)
// CREATE TABLE _USER(
//   user_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
//   FIRST_NAME VARCHAR(255) NOT NULL,
//   LAST_NAME VARCHAR(50) NOT NULL,
//   User_email VARCHAR(255) NOT NULL UNIQUE ,
//   UserName VARCHAR(50) NOT NULL UNIQUE,
//   CHECK (User_email LIKE '%@%'),
//   CHECK (User_email LIKE '%.com%')


const deleteUser = (req, res) => {
  const { id } = req.params.id;

  client.query(
    "DELETE FROM _USER WHERE user_id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`User deleted with ID: ${id}`);
    }
  );
};

router.delete("/:id", deleteUser);

module.exports = router;
