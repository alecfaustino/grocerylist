const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const pool = require("./db/db");

const usersRoutes = require("./routes/users-api");

//middleware
app.use(cors());
app.use("/users", usersRoutes);

// router definition

const listApi = require("./routes/list-api");

// mounting router
app.use("/api/lists", listApi);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
