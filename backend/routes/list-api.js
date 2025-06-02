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

// get all list belonging to user
router.get("/:userid", async (req, res) => {
  const user = req.params.userid;
  const listQuery = ` 
    SELECT * FROM lists WHERE user_id = $1;
  `;

  try {
    const listResult = await db.query(listQuery, [user]);
    console.log(listResult);
    res.status(200).json({ data: listResult.rows });
  } catch (error) {
    console.error("Failed fetching user lists");
    res.status(500).json({
      error: "Internal Server Error Fetching User Lists",
    });
  }
});
module.exports = router;
