import express from "express";
import pool from "../../db/db.js";

const router = express.Router();

//get all contacts

router.get("/", async (req, res) => {
  try {
    const contacts = await pool.query(`SELECT * FROM _CONTACT`);
    // const contacts = await pool.query(
    //   `SELECT _CONTACT.CONTACTNAME, CONTACT_PAST_JOB.contact_past_job_id, CONTACT_PAST_JOB.company_id, CONTACT_PAST_JOB.user_id FROM _CONTACT
    //   LEFT JOIN CONTACT_PAST_JOB
    //   ON _CONTACT.contact_id = CONTACT_PAST_JOB.contact_id`
    // );
    res.json({ contacts: contacts.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////

// Get contact by contact id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const singleContact = await pool.query(
      "SELECT * FROM _CONTACT WHERE contact_id = $1",
      [id]
    );
    res.json({ contact: singleContact.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////

//Get all contacts for user by user id

router.get("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const allUserContacts = await pool.query(
      `SELECT CONTACT.*, 
      (SELECT COMPANYNAME FROM _COMPANY WHERE CONTACT.company_id = _COMPANY.company_id) AS Companyname,
      CASE WHEN past_job.contact_id = CONTACT.contact_id THEN
      json_agg(DISTINCT jsonb_build_object('COMPANY', (SELECT COMPANYNAME FROM _COMPANY WHERE _COMPANY.company_id = past_job.company_id), 'COMPANY ID', past_job.company_id)) END as Past_Jobs
      FROM _CONTACT AS CONTACT
      LEFT JOIN CONTACT_PAST_JOB AS past_job 
      ON CONTACT.contact_id = past_job.contact_id
      WHERE CONTACT.user_id = $1
      GROUP BY contact.contact_id, past_job.contact_id`,
      [id]
    );
    res.json({ userContacts: allUserContacts.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/////////////////////////////////////////////////////////////////////////////////////////

// create contact information
router.post("/", async (req, res) => {
  try {
    const {
      company_id,
      user_id,
      CONTACTNAME,
      CONTACT_LINKEDIN,
      CONTACT_PHONE,
      CONTACT_EMAIL,
      reply_status,
      FOLLOWUP,
      past_job,
    } = req.body;
    const newContact = await pool.query(
      "INSERT INTO _CONTACT (company_id, user_id, CONTACTNAME, CONTACT_LINKEDIN,  CONTACT_PHONE, CONTACT_EMAIL, FOLLOWUP, past_job) VALUES ($1, $2, $3, $4, $5, $6, $7, ARRAY[$8]) RETURNING *",
      [
        company_id,
        user_id,
        CONTACTNAME,
        CONTACT_LINKEDIN,
        CONTACT_PHONE,
        CONTACT_EMAIL,
        FOLLOWUP,
        past_job,
      ]
    );
    res.json({ newCont: newContact.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/////////////////////////////////////////////////////////////////////////////////

//update contact info

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const {
      company_id,
      CONTACTNAME,
      CONTACT_LINKEDIN,
      CONTACT_PHONE,
      CONTACT_EMAIL,
      reply_status,
      FOLLOWUP,
      past_job,
    } = req.body;

    const updatedContact = await pool.query(
      "UPDATE _CONTACT SET company_id = $1, CONTACTNAME = $2, CONTACT_LINKEDIN = $3, CONTACT_PHONE = $4, CONTACT_EMAIL = $5, reply_status = $6, FOLLOWUP = $7, past_job = ARRAY[$8] WHERE contact_id = $9",
      [
        company_id,
        CONTACTNAME,
        CONTACT_LINKEDIN,
        CONTACT_PHONE,
        CONTACT_EMAIL,
        reply_status,
        FOLLOWUP,
        past_job,
        id,
      ]
    );
    res.status(200).send(`Updated info for: ${updatedContact}`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

////////////////////////////////////////////////////////////////////////////////////////////

//Delete constact by contact id
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    //query to get id passed from req.params.id
    const singleContact = await pool.query(
      "SELECT contact_id FROM _CONTACT WHERE contact_id = $1",
      [id]
    );
    //getting that value and storing it into a variable
    const toDeleteContact = singleContact.rows[0].contact_id;
    //check if the query matches the req.params.id || if so delete that contat
    if (toDeleteContact === id) {
      const toDeleteContact = await pool.query(
        "DELETE FROM _CONTACT WHERE contact_id = $1",
        [id]
      );
      res.status(200).send(`Contact deleted with ID: ${id}`);
    }
  } catch (error) {
    res.status(500).json({ error: "no contact in db with this id" });
  }
});

export default router;
