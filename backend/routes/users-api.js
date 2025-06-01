const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../db/db");

// test api for user list
// TODO delete this route

router.get("/", async (req, res) => {
  try {
    const result = await db.query(`SELECT * FROM users`);
    res.status(200).json({ data: result.rows });
  } catch (error) {
    console.log("error fetching users");
  }
});

// user registration
router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const createUserQuery = `
      INSERT INTO users (name, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    const createUserValues = [req.body.name, req.body.email, hashedPassword];
    const createUserResult = await db.query(createUserQuery, createUserValues);
    res.status(200).json({
      message: "User Created Successfully",
    });
  } catch (error) {
    console.error("Error registering user");
  }
});

// log in
router.post("/login", async (req, res) => {
  const userMatchQuery = `
  SELECT email, password_hash FROM users WHERE email = $1
  `;

  try {
    const userMatchResult = await db.query(userMatchQuery, [req.body.email]);
    if (userMatchResult.rows.length === 0) {
      return res.status(400).json({
        message: "User not found!",
      });
    }

    res.status(200).json({
      message: "User Found!",
      user: userMatchResult.rows,
    });
  } catch (error) {
    console.error("error logging in");
  }
});
module.exports = router;
