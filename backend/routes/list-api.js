const express = require("express");
const router = express.Router();
const db = require("../db/db");

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

// add a user list (personal)
router.post("/:userid", async (req, res) => {
  const user = req.params.userid;
  const name = req.body.name;
  const addlistQuery = `
  INSERT INTO lists (user_id, name)
  VALUES ($1, $2)
  RETURNING *;
  `;

  const addListValues = [user, name];

  try {
    const addListResult = await db.query(addlistQuery, addListValues);
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
router.delete("/:userid/:listid", async (req, res) => {
  const user = req.params.userid;
  const listId = req.params.listid;
  const deleteListQuery = `
  DELETE FROM lists
  WHERE list_id = $1 AND
  user_id = $2
  RETURNING *;
  `;

  const deleteQueryValues = [listId, user];

  try {
    const deleteResult = await db.query(deleteListQuery, deleteQueryValues);

    res.status(200).json({
      message: `Successfully deleted list ${listId} from user list ${user}`,
      data: deleteResult.rows[0],
    });
  } catch (error) {
    console.error("Failed to delete list: ", error);
    res.status(500).json({
      message: "Server Error Deleting User List",
    });
  }
});

module.exports = router;
