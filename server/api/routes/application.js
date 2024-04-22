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
      //   `SELECT _APPLICATION.creation_date as Applied_Date,
      //   COMPANYNAME as company,
      //  CASE WHEN _CONTACT.company_id = _APPLICATION.company_id
      //   AND _CONTACT.user_id = _APPLICATION.user_id
      //   THEN _CONTACT.contactname END as contact
      //   FROM _APPLICATION
      //   JOIN _COMPANY ON
      //   _APPLICATION.company_id = _COMPANY.company_id
      //   LEFT OUTER JOIN _CONTACT ON
      //   _APPLICATION.company_id = _CONTACT.company_id
      //   WHERE _APPLICATION.user_id = $1`,

      `SELECT _COMPANY.companyname as COMPANY,
      json_agg(DISTINCT jsonb_build_object('Application', _APPLICATION.applied_id, 'Applied_Date', _APPLICATION.creation_date)) as APPLICAITONS,
      CASE WHEN _CONTACT.company_id = _COMPANY.company_id AND _CONTACT.user_id = $1
      THEN json_agg(DISTINCT jsonb_build_object('CONTACT_ID', _CONTACT.contact_id, 'CONTACT_NAME', _CONTACT.contactname)) END as CONTACTS 
      FROM _COMPANY
      JOIN _APPLICATION ON
      _APPLICATION.company_id = _COMPANY.company_id
      LEFT JOIN _CONTACT ON
      _COMPANY.company_id = _CONTACT.company_id
      WHERE _APPLICATION.user_id = $1
      GROUP BY _COMPANY.company_id, _CONTACT.company_id, _CONTACT.user_id
      `,

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
