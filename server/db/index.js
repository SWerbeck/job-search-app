const pg = require('pg');
const client = new pg.Client('postgres://localhost/jsadb');

const getUsers = (request, response) => {
  client.query('SELECT * FROM _USER ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

client.connect();

module.exports = {
  client,
  getUsers,
};
