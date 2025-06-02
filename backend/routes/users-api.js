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

// get the userinfo
router.get("/me", async (req, res) => {
  const userId = req.session.user_id;

  if (!userId) {
    return res.status(403).json({
      message: "Not Logged In!",
    });
  }

  const userQuery = `
   SELECT * 
   FROM users
   WHERE user_id = $1;
  `;

  try {
    const userResult = await db.query(userQuery, [userId]);
    res.status(200).json(userResult.rows[0]);
  } catch (error) {
    console.error("Failed to get user info");
    res.status(500).json({ message: "Internal Server Error" });
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
  SELECT user_id, email, password_hash FROM users WHERE email = $1
  `;

  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        message: "Missing email or password!",
      });
    }
    const userMatchResult = await db.query(userMatchQuery, [req.body.email]);
    // if the email doesn't have a match in the db
    if (userMatchResult.rows.length === 0) {
      return res.status(400).json({
        message: "User not found!",
      });
    }

    const user = userMatchResult.rows[0];
    // returns a boolean
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password_hash
    );

    if (!passwordMatch)
      return res.status(401).json({ message: "Incorrect Password!" });

    req.session.user_id = user.user_id;

    res.status(200).json({
      message: "Login Success!",
      userId: user.user_id,
    });
  } catch (error) {
    console.error("error logging in", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/logout", (req, res) => {
  if (!req.session.user_id) {
    return res.status(400).json({ message: "Not Logged In" });
  }
  req.session = null;

  res.status(200).json({ message: "Logged out successfully" });
  // TODO redirect this eventually
});
module.exports = router;
