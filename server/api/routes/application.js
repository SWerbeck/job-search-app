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
      // fix getting past jobs

      `SELECT _COMPANY.companyname as COMPANY,
      json_agg(DISTINCT jsonb_build_object('Position', _APPLICATION.job_title, 'Application', _APPLICATION.applied_id, 'Applied_Date', _APPLICATION.creation_date)) as APPLICAITONS,
      CASE WHEN _CONTACT.company_id = _COMPANY.company_id AND _CONTACT.user_id = $1
      THEN json_agg(DISTINCT jsonb_build_object('CONTACT_ID', _CONTACT.contact_id, 'CONTACT_NAME', _CONTACT.contactname)) END as CONTACTS,
      CASE WHEN CONTACT_PAST_JOB.company_id = _COMPANY.company_id AND CONTACT_PAST_JOB.user_id = $1
      THEN json_agg(DISTINCT jsonb_build_object('CONTACT NAME', CONTACT_PAST_JOB.contactname, 'CONTACT_ID', CONTACT_PAST_JOB.contact_id)) END as Past_Job_Contacts
      FROM _COMPANY
      JOIN _APPLICATION ON
      _APPLICATION.company_id = _COMPANY.company_id
      LEFT JOIN _CONTACT ON
      _COMPANY.company_id = _CONTACT.company_id
      LEFT JOIN CONTACT_PAST_JOB ON
      _APPLICATION.company_id = CONTACT_PAST_JOB.company_id
      WHERE CASE WHEN _CONTACT.company_id = _APPLICATION.company_id THEN _APPLICATION.user_id = $1 AND _CONTACT.user_id = $1
      ELSE _APPLICATION.user_id = $1 END
      GROUP BY _COMPANY.company_id,  _application.company_id, _contact.company_id, _contact.user_id, contact_past_job.company_id, contact_past_job.user_id
      `,

      // should get 4 applications

      // `SELECT contact.contactname, app.application_status, app.company_id
      // FROM  _CONTACT AS contact
      // LEFT JOIN _APPLICATION AS app
      // ON contact.user_id = app.user_id AND contact.company_id = app.company_id
      // WHERE contact.USER_ID = $1`,

      // Below query works? Returns the right amount of applications. It only will include an additional app if you have more than 1 contact at the company.
      // Louis has 4 apps and it is returning correctly
      // Stephen has 4 apps and its return 5 because he has 2 contacts at rumble, Dave Lee and Bob Davis. The applied_ids are the same so this might be ok?
      // Guest has 6 apps and its return 7 because they have 2 contacts at rumble, Dave Lee and Bob Davis. The applied_ids are the same so this might be ok?
      // ---------------------------------------------

      // `SELECT app.applied_id, contact.contactname, company.companyname
      // FROM _APPLICATION AS app
      // LEFT JOIN _CONTACT AS contact
      // ON contact.user_id = app.user_id AND contact.company_id = app.company_id
      // JOIN _COMPANY AS company
      // ON app.company_id = company.company_id
      // WHERE app.USER_ID = $1`,

      // `SELECT app.applied_id, contact.contactname, company.companyname, past.contact_id
      // FROM _APPLICATION AS app
      // LEFT JOIN _CONTACT AS contact
      // ON contact.user_id = app.user_id AND contact.company_id = app.company_id
      // JOIN _COMPANY AS company
      // ON app.company_id = company.company_id
      // LEFT JOIN CONTACT_PAST_JOB AS past
      // ON contact.user_id = past.user_id
      // WHERE app.USER_ID = $1`,

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
