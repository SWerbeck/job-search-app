const router = require('express').Router();
const { client } = require('../../db/db.js');

const allUsers = 'SELECT * FROM _USER ORDER BY USER_ID ASC';

const getUsers = (req, res) => {
  client.query(allUsers, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

router.get('/', getUsers);

// Get user by id
const singleUser = 'SELECT * FROM _USER WHERE USER_ID = $1';

const getUserById = (req, res) => {
  const id = req.params.id;

  client.query(singleUser, [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};
router.get('/:id', getUserById);

// Post user
const postUser =
  'INSERT INTO _USER (FIRST_NAME, LAST_NAME, User_email, UserName ) VALUES ($1, $2, $3, $4) RETURNING *';

const createUser = (req, res) => {
  const { firstName, lastName, email, userName } = req.body;

  client.query(
    postUser,
    [firstName, lastName, email, userName],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`User added with username: ${userName}`);
    }
  );
};

router.post('/', createUser);

//PUT route
const putUser =
  'UPDATE _USER SET FIRST_NAME = $1, LAST_NAME = $2, User_email = $3, UserName = $4  WHERE user_id = $5';

const updateUser = (req, res) => {
  const id = req.params.id;
  const { firstName, lastName, email, userName } = req.body;

  client.query(
    putUser,
    [firstName, lastName, email, userName, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

router.put('/:id', updateUser);

//Delete user route
const deleteSingleUser = 'DELETE FROM _USER WHERE user_id = $1';

const deleteUser = (req, res) => {
  const id = req.params.id;

  client.query(deleteSingleUser, [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`User deleted with ID: ${id}`);
  });
};

router.delete('/:id', deleteUser);

module.exports = router;
