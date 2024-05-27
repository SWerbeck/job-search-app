import express from "express";
import bcrypt from "bcrypt";
import pool from "../../db/db.js";
import {
  deleteUserById,
  editUserById,
  postNewUser,
  selectAllUsers,
  selectSingleUserId,
  selectUserById,
  selectIdForGuest,
} from "./queries/userqueries.js";

const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await pool.query(selectAllUsers);
    res.json({ users: users.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get guest id by username
router.get("/guest", async (req, res) => {
  try {
    const guest = await pool.query(selectIdForGuest);
    res.json({ users: guest.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user by id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const singleUser = await pool.query(selectUserById, [id]);
    res.json({ users: singleUser.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// post new user to database
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, user_password, email, userName } = req.body;
    //hashed pw function
    const hashedPassword = await bcrypt.hash(user_password, 10);
    const newUser = await pool.query(postNewUser, [
      firstName,
      lastName,
      hashedPassword,
      email,
      userName,
    ]);
    res.json({ users: newUser.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT route edit user already in database
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { firstName, lastName, email, userName } = req.body;
    //hashed pw function
    //const hashedPassword = await bcrypt.hash(req.body.user_password, 10);
    const updatedUser = await pool.query(editUserById, [
      firstName,
      lastName,
      email,
      userName,
      id,
    ]);
    res.status(200).send(`Updated info for: ${userName}`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// delete user route
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    //query to get id passed from req.params.id
    const singleUserQuery = await pool.query(selectSingleUserId, [id]);
    //getting that value and storing it into a variable
    const singleUser = singleUserQuery.rows[0].user_id;
    //check if the query matches the req.params.id || if so delete that user
    if (singleUser === id) {
      await pool.query(deleteUserById, [id]);
      res.status(200).send(`User deleted with ID: ${id}`);
    }
  } catch (error) {
    res.status(500).json({ error: "no user in db with this id" });
  }
});

export default router;
