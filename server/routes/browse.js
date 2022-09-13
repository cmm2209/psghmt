// Connects to the database.
const dbo = require("../db/conn");

// Defines routes.
const express = require("express", "mongodb");
const browseRoutes = express.Router();
browseRoutes.route("/browse").get(function (req, res) {
  let db_connect = dbo.getDb("mtl_db");
  db_connect
    .collection("titles")
    .find({})
    .sort({ title: 1 })
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

module.exports = browseRoutes;
