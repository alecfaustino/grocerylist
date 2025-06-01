const express = require("express");
const router = express.Router();
const db = require("../db/db");

// test route to get all items from list
router.get("/:listid", async (req, res) => {
  const listId = req.params.listid;

  const getItemsQuery = `
    SELECT items.*, departments.name as department, stores.name as storename
    FROM items 
    LEFT JOIN departments
    ON departments.id = items.department_id
    LEFT JOIN stores 
    ON stores.id = items.store_id
    WHERE list_id = $1;
  `;

  const getItemsValues = [listId];

  try {
    // TODO CHECK IF THE USER HAS ACCESS TO THIS LIST
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
  const itemname = req.body.name;
  const quantity = req.body.quantity;
  const photoUrl = null;
  const departmentId = Number(req.body.department_id);
  const storeId = Number(req.body.store_id);
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

router.delete("/:listid/:itemid", async (req, res) => {
  const listId = req.params.listid;
  const itemId = req.params.itemid;

  // TODO VALIDATE IF USER HAS ACCESS TO THIS LIST
  const deleteItemQuery = `
    DELETE FROM items
    WHERE item_id = $1 AND
    list_id = $2
    RETURNING *;
  `;

  const deleteItemValues = [itemId, listId];

  try {
    const deleteItemResults = await db.query(deleteItemQuery, deleteItemValues);

    // TODO check proper status code for success in deletion
    res.status(200).json({
      message: `Success fully deleted item ${itemId} from list ${listId}`,
      data: deleteItemResults.rows[0],
    });
  } catch (error) {
    console.error(`Failed to delete list item`);
    res.status(500).json({
      error: "Server Error Deleting Item from List",
    });
  }
});

module.exports = router;
