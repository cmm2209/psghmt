const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = 6000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/browse"));
// get driver connection
const dbo = require("./db/conn");

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});

const AuthorRoutes = express.Router();
AuthorRoutes.route("/testing").get(function (req, res) {
  let db_connect = dbo.getDb();
  const qvalue = req.query.tongue;
  if (qvalue.length > 1) {
    db_connect
      .collection("titles")
      .find({ century: 17 })
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  } else if (qvalue) {
    db_connect
      .collection("titles")
      .find({ tongue: qvalue })
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  }
});
