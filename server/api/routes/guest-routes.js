import express from "express";
import pool from "../../db/db.js";
import {
  selectIdForGuest,
  getAllGuestApplications,
} from "./queries/guestqueries.js";

const router = express.Router();

// Get guest id by username
router.get("/", async (req, res) => {
  try {
    const guest = await pool.query(selectIdForGuest);
    res.json({ users: guest.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Get all applications for user by user id
router.get("/applications", async (req, res) => {
  try {
    const guest = await pool.query(selectIdForGuest);
    const allUserApplications = await pool.query(getAllGuestApplications, [
      guest.rows[0].user_id,
    ]);
    res.json({ userapplications: allUserApplications.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
export default router;
