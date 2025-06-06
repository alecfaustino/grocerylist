const express = require("express");
const router = express.Router();
const db = require("../db/db");
const { requireLogin } = require("../middleware/auth");

// get all list belonging to user
router.get("/", requireLogin, async (req, res) => {
  const userId = req.session.user_id;

  const listQuery = `SELECT * FROM lists WHERE user_id = $1;`;

  try {
    const listResult = await db.query(listQuery, [userId]);
    res.status(200).json({ data: listResult.rows });
  } catch (error) {
    console.error("Failed fetching user lists", error);
    res.status(500).json({
      error: "Internal Server Error Fetching User Lists",
    });
  }
});
// add a user list (personal)
router.post("/", requireLogin, async (req, res) => {
  const userId = req.session.user_id;
  const name = req.body.name;

  const addlistQuery = `
    INSERT INTO lists (user_id, name)
    VALUES ($1, $2)
    RETURNING *;
  `;

  try {
    const addListResult = await db.query(addlistQuery, [userId, name]);
    res.status(200).json({
      message: `Successfully added a new list`,
      data: addListResult.rows[0],
    });
  } catch (error) {
    console.error("Failed to add new list: ", error);
    res.status(500).json({
      error: "Server Error Adding List",
    });
  }
});

// delete a user list  (personal)
router.delete("/:listid", requireLogin, async (req, res) => {
  const userId = req.session.user_id;
  const listId = req.params.listid;

  const deleteListQuery = `
    DELETE FROM lists
    WHERE list_id = $1 AND user_id = $2
    RETURNING *;
  `;

  try {
    const deleteResult = await db.query(deleteListQuery, [listId, userId]);
    if (!deleteResult.rows.length) {
      return res.status(403).json({ error: "You do not own this list." });
    }
    res.status(200).json({
      message: `Successfully deleted list ${listId}`,
      data: deleteResult.rows[0],
    });
  } catch (error) {
    console.error("Failed to delete list: ", error);
    res.status(500).json({
      message: "Server Error Deleting User List",
    });
  }
});

// edit a user list (personal)

router.patch("/:listid", requireLogin, async (req, res) => {
  const userId = req.session.user_id;
  const listId = req.params.listid;
  const name = req.body.name;

  const editListQuery = `
  UPDATE lists
  SET name = $1
  WHERE list_id = $2 AND
  user_id = $3
  RETURNING *;
  `;

  const editListValues = [name, listId, userId];

  try {
    // check ownership
    const listCheck = await db.query(
      `SELECT * FROM lists WHERE list_id = $1 AND user_id = $2;`,
      [listId, userId]
    );
    if (listCheck.rows.length === 0) {
      return res
        .status(403)
        .json({ error: "Forbidden: You don't own this list" });
    }

    const editListResult = await db.query(editListQuery, editListValues);
    res.status(200).json({
      message: `Successfully updated the list`,
      data: editListResult.rows,
    });
  } catch (error) {
    console.error("error updating list");
    res.status(500).json({
      error: "Internal Server Error Updating List",
    });
  }
});

module.exports = router;
