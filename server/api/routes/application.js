import express from "express";
import pool from "../../db/db.js";

const router = express.Router();

// Get all applications
router.get("/", async (req, res) => {
  try {
    const applications = await pool.query(
      "SELECT * FROM _APPLICATION ORDER BY user_id ASC"
    );
    res.json({ applications: applications.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////

// Get application by id application id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const singleApplication = await pool.query(
      "SELECT * FROM _APPLICATION WHERE applied_id = $1",
      [id]
    );
    res.json({ application: singleApplication.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////

//Get all applications for user by user id

router.get("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const allUserApplications = await pool.query(
      "SELECT * FROM _APPLICATION WHERE user_id = $1",
      [id]
    );
    res.json({ userapplications: allUserApplications.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/////////////////////////////////////////////////////////////////////////////////////////

// create application
router.post("/", async (req, res) => {
  try {
    const { company_id, user_id, application_info } = req.body;
    const newApplication = await pool.query(
      "INSERT INTO _APPLICATION (company_id, user_id, application_info) VALUES ($1, $2, $3) RETURNING *",
      [company_id, user_id, application_info]
    );
    res.json({ newApp: newApplication.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/////////////////////////////////////////////////////////////////////////////////

//update application info

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { company_id, application_info, application_status } = req.body;
    const updatedApplication = await pool.query(
      "UPDATE _APPLICATION SET company_id = $1, application_info = $2, application_status = $3 WHERE applied_id = $4",
      [company_id, application_info, application_status, id]
    );
    res.status(200).send(`Updated info for: ${updatedApplication}`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

////////////////////////////////////////////////////////////////////////////////////////////

//Delete Application by application id
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    //query to get id passed from req.params.id
    const singleApplication = await pool.query(
      "SELECT applied_id FROM _APPLICATION WHERE applied_id = $1",
      [id]
    );
    //getting that value and storing it into a variable
    const toDeleteApplication = singleApplication.rows[0].applied_id;
    //check if the query matches the req.params.id || if so delete that application
    if (toDeleteApplication === id) {
      const toDeleteApplication = await pool.query(
        "DELETE FROM _APPLICATION WHERE applied_id = $1",
        [id]
      );
      res.status(200).send(`Application deleted with ID: ${id}`);
    }
  } catch (error) {
    res.status(500).json({ error: "no application in db with this id" });
  }
});

export default router;
