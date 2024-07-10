import express from 'express';
import pool from '../../db/db.js';
import { selectIdForGuest } from './queries/guestqueries.js';

const router = express.Router();

// Get guest id by username
router.get('/', async (req, res) => {
  try {
    const guest = await pool.query(selectIdForGuest);
    res.json({ users: guest.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
