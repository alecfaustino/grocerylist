const express = require("express");
const router = express.Router();

// // get all of the lists belonging to a user
// router.get('/users/:userId/lists', async (req, res) => {
//   const userId = req.params.userId;
//   const queryString =
//     `SELECT
//     lists.list_id,
//     lists.name,
//     lists.user_id,
//     lists.household_id,
//     CASE
//       WHEN lists.user_id IS NOT NULL THEN 'personal'
//       ELSE 'household'
//     END AS type
//     FROM lists
//     LEFT JOIN household_users
//     ON lists.household_id = household_users.household_id
//     WHERE lists.user_id = $1 OR household_users.user_id = $1`;
//   const inputs = [userId];
//   try {
//     const result = await pool.query(query, [userId]);
//     res.json(result.rows);
//   } catch (error) {
//     console.error('Error fetching user lists:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }

// })

//next route is to get list items for the list the user selects GET /lists/:listId/items
module.exports = router;
