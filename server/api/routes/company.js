import express from "express";
import pool from "../../db/db.js";
import {
  deleteSingleCompanyById,
  editCompanyById,
  postNewCompany,
  selectAllCompanies,
  selectCompanyById,
  selectSingleCompanyId,
  selectUsersCompanies,
} from "./queries/companyqueries.js";

const router = express.Router();

// Get all companies
router.get("/", async (req, res) => {
  try {
    const companies = await pool.query(selectAllCompanies);
    res.json({ companies: companies.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single company by id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const singleCompany = await pool.query(selectCompanyById, [id]);
    res.json({ users: singleCompany.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all companies for a specific user

router.get("/usercompanies/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const singleCompany = await pool.query(selectUsersCompanies, [id]);
    res.json({ users: singleCompany.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Post new company to database
router.post("/", async (req, res) => {
  try {
    const { companyName } = req.body;
    const newUser = await pool.query(postNewCompany, [companyName]);
    res.json({ users: newUser.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Put route edit company already in database
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { companyName } = req.body;
    await pool.query(editCompanyById, [companyName, id]);
    res.status(200).send(`Updated info for: ${companyName}`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// delete company route
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    //query to get id passed from req.params.id
    const singleCompanyQuery = await pool.query(selectSingleCompanyId, [id]);
    //getting that value and storing it into a variable
    const singleCompanyId = singleCompanyQuery.rows[0].company_id;
    //check if the query matches the req.params.id || if so delete that company
    if (singleCompanyId === id) {
      await pool.query(deleteSingleCompanyById, [id]);
      res.status(200).send(`company deleted with ID: ${id}`);
    }
  } catch (error) {
    res.status(500).json({ error: "no company in db with this id" });
  }
});

export default router;
