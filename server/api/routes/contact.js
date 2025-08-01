import express from "express";
import pool from "../../db/db.js";
import {
  deleteContactById,
  editContactById,
  getContactByUserId,
  postNewContact,
  selectAllContacts,
  selectContactById,
  selectSingleByContactId,
} from "./queries/contactqueries.js";
import { postNewCompany } from "./queries/companyqueries.js";

const router = express.Router();

//Get all contacts

router.get("/", async (req, res) => {
  try {
    const contacts = await pool.query(selectAllContacts);
    res.json({ contacts: contacts.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get contact by contact id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const singleContact = await pool.query(selectContactById, [id]);
    res.json({ contact: singleContact.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Get all contacts for user by user id
router.get("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const allUserContacts = await pool.query(getContactByUserId, [id]);
    res.json({ userContacts: allUserContacts.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

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
      companyName,
    } = req.body;
    if (company_id === "0") {
      let createdCompanyId;
      const newInsertCompany = await pool.query(postNewCompany, [companyName]);
      createdCompanyId = newInsertCompany.rows[0].company_id;
      console.log("createdCompanyId?", createdCompanyId);
      const newContact = await pool.query(postNewContact, [
        createdCompanyId,
        user_id,
        CONTACTNAME,
        CONTACT_LINKEDIN,
        CONTACT_PHONE,
        CONTACT_EMAIL,
        FOLLOWUP,
      ]);
      res.json({ newCont: newContact.rows[0] });
    } else {
      const newContact = await pool.query(postNewContact, [
        company_id,
        user_id,
        CONTACTNAME,
        CONTACT_LINKEDIN,
        CONTACT_PHONE,
        CONTACT_EMAIL,
        FOLLOWUP,
      ]);
      res.json({ newCont: newContact.rows[0] });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//update contact info
// reply_status needs to be updated for the put request to go through
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let {
      company_id,
      CONTACTNAME,
      CONTACT_LINKEDIN,
      CONTACT_PHONE,
      CONTACT_EMAIL,
      reply_status,
      FOLLOWUP,
    } = req.body;

    CONTACT_LINKEDIN = CONTACT_LINKEDIN?.trim() || null;
    CONTACT_PHONE = CONTACT_PHONE?.trim() || null;
    CONTACT_EMAIL = CONTACT_EMAIL?.trim() || null;

    const updatedContact = await pool.query(editContactById, [
      //company_id,
      CONTACTNAME,
      CONTACT_LINKEDIN,
      CONTACT_PHONE,
      CONTACT_EMAIL,
      reply_status,
      //FOLLOWUP,
      id,
    ]);
    res.status(200).send(`Updated info for: ${updatedContact}`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Delete constact by contact id
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    //query to get id passed from req.params.id
    const singleContact = await pool.query(selectSingleByContactId, [id]);
    //getting that value and storing it into a variable
    const toDeleteContact = singleContact.rows[0].contact_id;
    //check if the query matches the req.params.id || if so delete that contat
    if (toDeleteContact === id) {
      await pool.query(deleteContactById, [id]);
      res.status(200).send(`Contact deleted with ID: ${id}`);
    }
  } catch (error) {
    res.status(500).json({ error: "no contact in db with this id" });
  }
});

export default router;
