const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const pool = require('./db/db');

//middleware
app.use(cors());

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});