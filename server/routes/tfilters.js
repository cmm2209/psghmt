const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const AuthorRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

AuthorRoutes.route("/tfilters").get(function (req, res) {
  let db_connect = dbo.getDb();
  if (req.query.author) {
    let aqueryid = req.query.author;
    db_connect
      .collection("titles")
      .find({ author: ObjectId(aqueryid) })
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  }
  if (req.query.century) {
    let cqueryint = parseInt(req.query.century);
    db_connect
      .collection("titles")
      .find({ century: cqueryint })
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  }
  if (req.query.tongue) {
    db_connect
      .collection("titles")
      .find({ tongue: req.query.tongue })
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  }
});

module.exports = AuthorRoutes;
