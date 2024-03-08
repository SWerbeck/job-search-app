// const pg = require('pg');
// const client = new pg.Client('postgres://localhost/jsadb');

// client.connect();

// module.exports = {
//   client,
// };

const pg = require('pg');
const { Pool } = pg;

let localPoolConfig = {
  //user: 'postgres',
  host: 'localhost',
  port: '5432',
  database: 'jsadb',
};

let poolConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    }
  : localPoolConfig;

const pool = new Pool(poolConfig);

module.exports = {
  pool,
};
