const express = require("express");
const router = express.Router();
const db = require("../db/db");
const { requireLogin } = require("../middleware/auth");

module.exports = router;
