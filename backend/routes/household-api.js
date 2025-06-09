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

router.get("/:householdId", async (req, res) => {
  // TODO remove || 1 after postman testing
  userId = req.session.user_id || 1;
  // TODO remove || 1 after UI is set up
  householdId = req.params.householdId || 1;
  const query = `
    SELECT users.name, household_users.household_id AS household_id, households.name AS household_name FROM users LEFT JOIN household_users ON users.user_id = household_users.user_id LEFT JOIN households ON household_users.household_id = households.household_id
    WHERE households.household_id = $1;
  `;
  const values = [householdId];
  try {
    const result = await db.query(query, values);

    res.status(200).json({
      message: "Successfully fetched household members",
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching household members: ", error);
    res.status(500).json({
      message: "Internal Server Error while fetching household members",
      error,
    });
  }
});

module.exports = router;
