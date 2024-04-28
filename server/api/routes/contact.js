import express from 'express';
import pool from '../../db/db.js';

const router = express.Router();

//get all contacts

router.get('/', async (req, res) => {
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
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const singleContact = await pool.query(
      'SELECT * FROM _CONTACT WHERE contact_id = $1',
      [id]
    );
    res.json({ contact: singleContact.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////

//Get all contacts for user by user id

router.get('/user/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const allUserContacts = await pool.query(
      // `SELECT _COMPANY.companyname as COMPANY,
      // json_agg(DISTINCT jsonb_build_object('Application', _APPLICATION.applied_id, 'Applied_Date', _APPLICATION.creation_date)) as APPLICAITONS,
      // CASE WHEN _CONTACT.company_id = _COMPANY.company_id AND _CONTACT.user_id = $1
      // THEN json_agg(DISTINCT jsonb_build_object('CONTACT_ID', _CONTACT.contact_id, 'CONTACT_NAME', _CONTACT.contactname)) END as CONTACTS
      // FROM _COMPANY
      // JOIN _APPLICATION ON
      // _APPLICATION.company_id = _COMPANY.company_id
      // LEFT JOIN _CONTACT ON
      // _COMPANY.company_id = _CONTACT.company_id
      // WHERE _APPLICATION.user_id = $1
      // GROUP BY _COMPANY.company_id, _CONTACT.company_id, _CONTACT.user_id
      // `,

      // `SELECT _CONTACT.contact_id, _CONTACT.CONTACTNAME as CONTACT_NAME, _CONTACT.contact_email as CONTACT_EMAIL,
      //  _CONTACT.contact_linkedin as CONTACT_LINKEDIN, _CONTACT.contact_phone as CONTACT_PHONE_NUMBER,
      //  _COMPANY.companyname as COMPANY,
      //  _CONTACT.reply_status as Reply_Status,
      //  _CONTACT.last_contacted as LAST_CONTACTED,
      //  _CONTACT.followup_reminder as FOLLOW_UP,
      //  CASE WHEN _APPLICATION.company_id = _CONTACT.company_id AND _APPLICATION.user_id = _CONTACT.user_id
      //  THEN json_agg(DISTINCT jsonb_build_object('APPLICATION_DATE', _APPLICATION.creation_date)) END as APPLICATIONS
      //  FROM _CONTACT
      //  JOIN _COMPANY
      //  ON _COMPANY.company_id = _CONTACT.company_id
      //  LEFT JOIN _APPLICATION
      //  ON _CONTACT.company_id = _APPLICATION.company_id
      //  WHERE _CONTACT.user_id = $1 AND _APPLICATION.user_id = $1
      //  GROUP BY _APPLICATION.applied_id, _COMPANY.companyname, _CONTACT.contact_id, _APPLICATION.user_id, _APPLICATION.company_id
      //  `,

      // I THINK THIS BELOW QUERY IS WORKING??
      // -------------------------------------
      // For Louis is returns all 3 contacts - one of them has the contact_past_job_id that we seed in CONTACT_PAST_JOB INSERT
      // For Stephen it returns all 3 contacts - no past_jobs
      // For guest it returns all 5 contacts - no past jobs

      `SELECT contact.contactname, contact.contact_id, contact.company_id, past_job.contact_past_job_id
      FROM _CONTACT AS contact
      LEFT JOIN CONTACT_PAST_JOB AS past_job 
      ON contact.contact_id = past_job.contact_id
      WHERE contact.user_id = $1`,
      [id]
    );
    res.json({ userContacts: allUserContacts.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/////////////////////////////////////////////////////////////////////////////////////////

// create contact information
router.post('/', async (req, res) => {
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
      'INSERT INTO _CONTACT (company_id, user_id, CONTACTNAME, CONTACT_LINKEDIN,  CONTACT_PHONE, CONTACT_EMAIL, FOLLOWUP, past_job) VALUES ($1, $2, $3, $4, $5, $6, $7, ARRAY[$8]) RETURNING *',
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

router.put('/:id', async (req, res) => {
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
      'UPDATE _CONTACT SET company_id = $1, CONTACTNAME = $2, CONTACT_LINKEDIN = $3, CONTACT_PHONE = $4, CONTACT_EMAIL = $5, reply_status = $6, FOLLOWUP = $7, past_job = ARRAY[$8] WHERE contact_id = $9',
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
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    //query to get id passed from req.params.id
    const singleContact = await pool.query(
      'SELECT contact_id FROM _CONTACT WHERE contact_id = $1',
      [id]
    );
    //getting that value and storing it into a variable
    const toDeleteContact = singleContact.rows[0].contact_id;
    //check if the query matches the req.params.id || if so delete that contat
    if (toDeleteContact === id) {
      const toDeleteContact = await pool.query(
        'DELETE FROM _CONTACT WHERE contact_id = $1',
        [id]
      );
      res.status(200).send(`Contact deleted with ID: ${id}`);
    }
  } catch (error) {
    res.status(500).json({ error: 'no contact in db with this id' });
  }
});

export default router;
