// import { pool } from "./db.js";
// import { syncAndSeed } from "./db.js";

// const syncAndSeed = async () => {
//   const SQL = `
//     DROP TABLE IF EXISTS _APPLICATION;
//     DROP TABLE IF EXISTS _COMPANY;
//     DROP TABLE IF EXISTS _CONTACT;
//     DROP TABLE IF EXISTS _USER;

//     CREATE TABLE _USER(
//       user_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
//       FIRST_NAME VARCHAR(255) NOT NULL,
//       LAST_NAME VARCHAR(50) NOT NULL,
//       creation_date TIMESTAMPTZ DEFAULT Now()::timestamp,
//       User_email VARCHAR(255) NOT NULL UNIQUE,
//       UserName VARCHAR(50) NOT NULL UNIQUE,
//       CHECK (User_email LIKE '%@%'),
//       CHECK (User_email LIKE '%.com%')

//     );

//     INSERT INTO _USER (FIRST_NAME, LAST_NAME, User_email, UserName)
//     VALUES ('Louis', 'Rabeno', 'louis@test.com', 'louisiscool123');

//     INSERT INTO _USER (FIRST_NAME, LAST_NAME, User_email, UserName)
//     VALUES ('Stephen', 'Werbeck', 'steve@gmail.com', 'SWerb');
//     `;
//   await pool.query(SQL);
// };

// const init = async () => {
//   try {
//     await pool.connect();
//     await syncAndSeed();
//   } catch (error) {
//     console.log(error);
//   }
// };
// init();
