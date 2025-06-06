const express = require("express");
const router = express.Router();
const db = require("../db/db");

router.get("/", async (req, res) => {
  try {
    const result = await db.query(
      `SELECT id, name FROM stores ORDER BY name ASC;`
    );
    res.status(200).json(result.rows); // [{ id: 1, name: "Costco" }, ...]
  } catch (error) {
    console.error("Error fetching stores:", error);
    res.status(500).json({ error: "Failed to load stores" });
  }
});

module.exports = router;
