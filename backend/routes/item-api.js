const express = require("express");
const router = express.Router();
const db = require("../db/db");
const { requireLogin } = require("../middleware/auth");

// get all items from list
router.get("/:listid", requireLogin, async (req, res) => {
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

  const listOwnerQuery = `
  SELECT name 
  FROM lists 
  WHERE list_id = $1 AND
  user_id = $2;
  `;

  const listOwnerValues = [listId, req.session.user_id];

  const getItemsValues = [listId];

  try {
    const listCheck = await db.query(listOwnerQuery, listOwnerValues);

    if (listCheck.rows.length === 0) {
      return res
        .status(403)
        .json({ error: "Forbidden: You don't own this list" });
    }
    const getItemsResult = await db.query(getItemsQuery, getItemsValues);
    res
      .status(200)
      .json({ item: getItemsResult.rows, listName: listCheck.rows[0].name });
  } catch (error) {
    console.error(`error fetching items for list ${listId}`);
    res.status(500).json({
      error: `Internal Server Error fetching items for list ${listId}`,
    });
  }
});

// add list item to list
router.post("/:listid", requireLogin, async (req, res) => {
  const userId = req.session.user_id;
  if (!userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  const submittedStoreName = req.body.store_name?.trim();
  if (!submittedStoreName) {
    return res.status(400).json({ error: "Store name is required" });
  }

  const normalize = (name) =>
    name
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/[^a-z0-9]/gi, "");

  // Get all stores
  const allStores = await db.query(`SELECT id, name FROM stores`);
  const normalizedSubmitted = normalize(submittedStoreName);

  // Try to find an existing match
  let storeId = null;
  for (const store of allStores.rows) {
    if (normalize(store.name) === normalizedSubmitted) {
      storeId = store.id;
      break;
    }
  }

  // If no match, insert new store
  if (!storeId) {
    const insertResult = await db.query(
      `INSERT INTO stores (name) VALUES ($1) RETURNING id`,
      [submittedStoreName]
    );
    storeId = insertResult.rows[0].id;
  }

  const listid = req.params.listid;
  const itemname = req.body.name;
  const quantity = req.body.quantity;
  // TODO implement this photo function in the future
  const photoUrl = null;
  const departmentId = Number(req.body.department_id);

  const addItemQuery = `
    INSERT INTO items (list_id, name, quantity, photo_url, department_id, store_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  const addItemValues = [
    listid,
    itemname,
    quantity,
    photoUrl,
    departmentId,
    storeId,
  ];
  try {
    // check ownership
    const listCheck = await db.query(
      `SELECT * FROM lists WHERE list_id = $1 AND user_id = $2;`,
      [listid, req.session.user_id]
    );
    if (listCheck.rows.length === 0) {
      return res
        .status(403)
        .json({ error: "Forbidden: You don't own this list" });
    }
    const addItemResult = await db.query(addItemQuery, addItemValues);
    res.status(200).json({
      message: `Successfully added to list ${listid}: `,
      item: addItemResult.rows[0],
    });
  } catch (error) {
    console.error("Failed to add list item: ", error);
    res.status(500).json({
      error: "Server Error Adding Item",
    });
  }
});

// delete from a list
router.delete("/:listid/:itemid", requireLogin, async (req, res) => {
  const userId = req.session.user_id;
  if (!userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  const listId = req.params.listid;
  const itemId = req.params.itemid;

  const deleteItemQuery = `
    DELETE FROM items
    WHERE item_id = $1 AND
    list_id = $2
    RETURNING *;
  `;

  const deleteItemValues = [itemId, listId];

  try {
    // check ownership
    const listCheck = await db.query(
      `SELECT * FROM lists WHERE list_id = $1 AND user_id = $2;`,
      [listId, req.session.user_id]
    );
    if (listCheck.rows.length === 0) {
      return res
        .status(403)
        .json({ error: "Forbidden: You don't own this list" });
    }
    const deleteItemResults = await db.query(deleteItemQuery, deleteItemValues);

    // TODO check proper status code for success in deletion
    res.status(200).json({
      message: `Successfully deleted item ${itemId} from list ${listId}`,
      data: deleteItemResults.rows[0],
    });
  } catch (error) {
    console.error(`Failed to delete list item`);
    res.status(500).json({
      error: "Server Error Deleting Item from List",
    });
  }
});

// edit a single item on a list
router.patch("/:listid/:itemid", requireLogin, async (req, res) => {
  const userId = req.session.user_id;
  if (!userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  const listId = req.params.listid;
  const itemId = req.params.itemid;
  //TODO implement photoUrl editting
  const {
    name,
    quantity,
    photo_url = null,
    department_id,
    store_name,
  } = req.body;

  let store_id;
  if (store_name) {
    const checkStoreQuery = `
    SELECT id FROM stores WHERE LOWER(name) = LOWER($1);
  `;
    const checkStoreResult = await db.query(checkStoreQuery, [
      store_name.trim(),
    ]);

    if (checkStoreResult.rows.length > 0) {
      store_id = checkStoreResult.rows[0].id;
    } else {
      const insertStoreQuery = `
      INSERT INTO stores (name)
      VALUES ($1)
      RETURNING id;
    `;
      const insertResult = await db.query(insertStoreQuery, [
        store_name.trim(),
      ]);
      store_id = insertResult.rows[0].id;
    }
  }
  const patchQuery = `
  UPDATE items
  SET name = $1,
  quantity = $2,
  photo_url = $3,
  department_id = $4,
  store_id = $5
  WHERE list_id = $6 AND
  item_id = $7
  RETURNING *;
  `;

  const patchValues = [
    name,
    quantity,
    photo_url,
    department_id,
    store_id,
    listId,
    itemId,
  ];

  try {
    // check ownership
    const listCheck = await db.query(
      `SELECT * FROM lists WHERE list_id = $1 AND user_id = $2;`,
      [listId, req.session.user_id]
    );
    if (listCheck.rows.length === 0) {
      return res
        .status(403)
        .json({ error: "Forbidden: You don't own this list" });
    }
    const patchResult = await db.query(patchQuery, patchValues);
    res.status(200).json({
      message: `Successfully updated item ${itemId} in list ${listId}`,
      data: patchResult.rows,
    });
  } catch (error) {
    console.error("error updating list item");
    res.status(500).json({
      error: "Server Error Updating List Item",
    });
  }
});

module.exports = router;
