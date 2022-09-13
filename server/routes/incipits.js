// Connects to the database.
const dbo = require("../db/conn");

// Defines routes.
const express = require("express", "mongodb");
const incRoutes = express.Router();
incRoutes.route("/incipits").get(function (req, res) {
  let db_connect = dbo.getDb("mtl_db");
  db_connect
    .collection("titles")
    .find({})
    .sort({ incipit: 1 })
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

module.exports = incRoutes;
