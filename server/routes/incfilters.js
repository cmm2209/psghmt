const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const TitleRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
// const ObjectId = require("mongodb").ObjectId;

TitleRoutes.route("/incfilters").get(function (req, res) {
  let db_connect = dbo.getDb();

  // Convert tongue query to array
  if (
    typeof req.query.tongue === "string" ||
    req.query.tongue instanceof String
  ) {
    var tquery = [];
    tquery.push(req.query.tongue);
  } else if (Array.isArray(req.query.tongue)) {
    var tquery = req.query.tongue;
  }

  // Convert century query to array
  if (
    typeof req.query.century === "string" ||
    req.query.century instanceof String
  ) {
    var cquery = [];
    cquery.push(req.query.century);
    var cqueryIntArr = [],
      obj,
      temp = cquery,
      i;
    for (i = 0; i < temp.length; i++) {
      obj = {};
      obj = parseInt(temp[i]);
      cqueryIntArr.push(obj);
    }
  } else if (Array.isArray(req.query.century)) {
    var cquery = req.query.century;
    var cqueryIntArr = [],
      obj,
      temp = cquery,
      i;
    for (i = 0; i < temp.length; i++) {
      obj = {};
      obj = parseInt(temp[i]);
      cqueryIntArr.push(obj);
    }
  }

  // Filtering
  if (tquery && cquery) {
    db_connect
      .collection("titles")
      .find({ tongue: { $in: tquery }, century: { $in: cqueryIntArr } })
      .sort({ incipit: 1 })
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  } else if (cquery) {
    db_connect
      .collection("titles")
      .find({ century: { $in: cqueryIntArr } })
      .sort({ incipit: 1 })
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  } else if (tquery) {
    db_connect
      .collection("titles")
      .find({ tongue: { $in: tquery } })
      .sort({ incipit: 1 })
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  }
});

module.exports = TitleRoutes;
