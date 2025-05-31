const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const cors = require("cors");
const pool = require("./db/db");
const morgan = require("morgan");

const usersRoutes = require("./routes/users-api");

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/users", usersRoutes);

// router definition
const listApi = require("./routes/list-api");

// mounting router
app.use("/api/lists", listApi);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
