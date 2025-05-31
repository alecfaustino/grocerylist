const express = require("express");
const router = express.Router();
const db = require("../db/db");

// get all list in db
router.get("/", async (req, res) => {
  const query = "SELECT * FROM lists;";

  try {
    const result = await db.query(query);
    res.status(200).json({ data: result.rows });
  } catch (error) {
    console.error("Failed to fetch");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// add a list -- to all lists ------ incomplete
// router.post("/", async (req, res) => {

//   const addItemQuery = `
//     INSERT into lists (user_id, name, )
//   `;
// });
module.exports = router;
