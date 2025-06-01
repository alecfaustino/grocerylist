const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const cors = require("cors");
const pool = require("./db/db");
const morgan = require("morgan");
const cookieSession = require("cookie-session");

//middleware
app.use(cors());
app.use(express.json());
app.use(
  cookieSession({
    name: "session",
    // TODO MOVE KEY TO PROCESS.ENV
    keys: ["aksjengaeg"],
    maxAge: 24 * 60 * 60 * 1000, // 1 day session
    httpOnly: true,
    // secture: process.env.NODE_ENV === 'production'
  })
);
app.use(morgan("dev"));

// router definition
const usersRoutes = require("./routes/users-api");
const listApi = require("./routes/list-api");
const itemApi = require("./routes/item-api");

// mounting router
app.use("/api/users", usersRoutes);
app.use("/api/lists", listApi);
app.use("/api/items", itemApi);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
