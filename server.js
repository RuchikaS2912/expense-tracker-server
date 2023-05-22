const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8080;
const cors = require("cors");
const path = require("path");
const apiRoutes = require("./routes/apiRoutes");
const { connectDB } = require("./db/database");

// app.use(express.static("../client/build"));
// use middleware
app.use(cors());
app.use(express.json());

// connecting to the database
connectDB();

console.log("Running the server");

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "client", "build", "index.html"),
      function (err) {
        if (err) {
          res.status(500).send(err);
        }
      }
    );
  });
}

app.get("/", async (req, res, next) => {
  res.sendFile("index.html");
});

// use routes
app.use("/api/v1", apiRoutes);

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});

module.exports = app;
