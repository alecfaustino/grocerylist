const express = require("express");
const router = express.Router();
const db = require("../db/db");

// test route to get all items from list 1
router.get("/", async (req, res) => {
  const listId = 1;

  try {
    const result = await db.query("SELECT * FROM items");
    res.status(200).json({ item: result.rows });
  } catch (error) {
    console.error("error fetching items for list 1");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
