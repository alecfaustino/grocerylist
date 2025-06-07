const express = require("express");
const router = express.Router();
const db = require("../db/db");
const { requireLogin } = require("../middleware/auth");

// get household user belongs to
// TODO add requireLogin after postman test
router.get("/", async (req, res) => {
  // TODO REMOVE 1 after postman test
  const userId = req.session.user_id || 1;

  const query = `
    SELECT h.household_id, h.name AS household_name, hu.role
    FROM household_users hu
    JOIN households h ON hu.household_id = h.household_id
    WHERE hu.user_id = $1;
  `;

  try {
    const result = await db.query(query, [userId]);
    res
      .status(200)
      .json({ message: "Fetched user's households", data: result.rows });
  } catch (error) {
    console.error("Error fetching user households: ", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

// get members of a specific household
// for admin information (delete, edit users etc)

module.exports = router;
