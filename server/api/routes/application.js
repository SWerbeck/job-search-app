import express from "express";
import pool from "../../db/db.js";
import {
  deleteApplicationById,
  editApplicationById,
  getAllUserApplications,
  postNewApplication,
  selectAllApplications,
  selectApplicationById,
  singleApplicationById,
} from "./queries/applicationqueries.js";

import { editCompanyById } from "./queries/companyqueries.js";
import verifyJWT from "../auth-middleware/authorization.js";

const router = express.Router();

// Get all applications
router.get("/", async (req, res) => {
  try {
    const applications = await pool.query(selectAllApplications);
    res.json({ applications: applications.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get application by id application id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const singleApplication = await pool.query(selectApplicationById, [id]);
    res.json({ application: singleApplication.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Get all applications for user by user id
router.get("/user/:id", verifyJWT, async (req, res) => {
  try {
    const id = req.params.id;

    const allUserApplications = await pool.query(getAllUserApplications, [id]);
    res.json({ userapplications: allUserApplications.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// post new application to database
// default values in tables are not coming through like application_info
router.post("/", async (req, res) => {
  try {
    const { job_title, company_id, user_id, application_info } = req.body;
    const newApplication = await pool.query(postNewApplication, [
      job_title,
      company_id,
      user_id,
      application_info,
    ]);
    res.json({ newApp: newApplication.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//update application info
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const {
      job_title,
      company_id,
      application_info,
      application_status,
      companyName,
    } = req.body;
    await pool.query(editApplicationById, [
      job_title,
      // company_id,
      // application_info,
      // application_status,
      id,
    ]);
    await pool.query(editCompanyById, [companyName, company_id]);
    res
      .status(200)
      .send(`Updated info for: ${job_title} with company_id ${company_id}`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Delete Application by application id
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    //query to get id passed from req.params.id
    const singleApplication = await pool.query(singleApplicationById, [id]);
    //getting that value and storing it into a variable
    const toDeleteApplication = singleApplication.rows[0].applied_id;
    //check if the query matches the req.params.id || if so delete that application
    if (toDeleteApplication === id) {
      await pool.query(deleteApplicationById, [id]);
      res.status(200).send(`Application deleted with ID: ${id}`);
    }
  } catch (error) {
    res.status(500).json({ error: "no application in db with this id" });
  }
});

export default router;
