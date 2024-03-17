// const router = require("express").Router();
// const { client } = require("../../db/db.js");

// // get all applied companies associations
// const allAppliedComapnies = "SELECT * FROM _APPLICATION ORDER BY USER_ID ASC";

// const getAppliedCompanies = (req, res) => {
//   client.query(allAppliedComapnies, (error, results) => {
//     if (error) {
//       throw error;
//     }
//     res.status(200).json(results.rows);
//   });
// };

// router.get("/", getAppliedCompanies);

// ////////////////////////////////////////////////////////////////////////////////////////////////

// //get all companies specific user applied to

// const usersCompanies = "SELECT * FROM _APPLICATION WHERE USER_ID = $1";

// const getUsersCompanies = (req, res) => {
//   const id = req.params.id;

//   client.query(usersCompanies, [id], (error, results) => {
//     if (error) {
//       throw error;
//     }
//     res.status(200).json(results.rows);
//   });
// };
// router.get("/:id", getUsersCompanies);

// ////////////////////////////////////////////////////////////////////////////////////////////

// //create new association between user and company

// const createApplied = (req, res) => {
//     const { user_id, company_id } = req.body;

//     client.query(
//       "INSERT INTO _APPLICATION (user_id, company_id) VALUES ($1, $2) RETURNING *",
//       [user_id, company_id],
//       (error, results) => {
//         if (error) {
//           throw error;
//         }
//         res.status(201).send(`User Applied to Company added with ID: ${results.rows[0].id}`);
//       }
//     );
//   };

//   router.post("/", createApplied);

//   ///////////////////////////////////////////////////////////////////////////////////////////////////////

//   // delete application from user

//   const deleteApplied = (req, res) => {
//     const id  = req.params.id;

//     client.query(
//       "DELETE FROM _APPLICATION WHERE applied_id = $1",
//       [id],
//       (error, results) => {
//         if (error) {
//           throw error;
//         }
//         res.status(200).send(`User Applied to Company deleted with ID: ${id}`);
//       }
//     );
//   };

//   router.delete("/:id", deleteApplied);

// module.exports = router;
