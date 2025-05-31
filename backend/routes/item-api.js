const express = require("express");
const router = express.Router();
const db = require("../db/db");

// test route to get all items from list
router.get("/:listid", async (req, res) => {
  const listId = req.params.listid;

  const getItemsQuery = `
    SELECT * FROM items WHERE list_id = $1;
  `;

  const getItemsValues = [listId];

  try {
    const getItemsResult = await db.query(getItemsQuery, getItemsValues);
    res.status(200).json({ item: getItemsResult.rows });
  } catch (error) {
    console.error(`error fetching items for list ${listId}`);
    res.status(500).json({
      error: `Internal Server Error fetching items for list ${listId}`,
    });
  }
});

// add list item to list
router.post("/:listid", async (req, res) => {
  // TODO REMOVE HARD CODING OF LIST
  const listid = req.params.listid;
  // TODO GET THESE VALUES FROM REQ.BODY IN THE FUTURE
  const itemname = "oranges";
  const quantity = 4;
  const photoUrl = null;
  const departmentId = 1;
  const storeId = 1;
  // TODO ADD VALIDATION THAT USER AUTHORIZED TO LIST
  // ------ //

  const addItemQuery = `
    INSERT INTO items (list_id, name, quantity, photo_url, department_id, store_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  // HARD CODED FOR NOW BUT WILL WORK WITH RES.BODY
  const addItemValues = [
    listid,
    itemname,
    quantity,
    photoUrl,
    departmentId,
    storeId,
  ];

  try {
    const addItemResult = await db.query(addItemQuery, addItemValues);
    res.status(200).json({
      message: `Successfully added to list ${listid}: `,
      item: addItemResult.rows[0],
    });
  } catch (error) {
    console.error("Failed to add list item");
    res.status(500).json({
      error: "Server Error Adding Item",
    });
  }
});

module.exports = router;
