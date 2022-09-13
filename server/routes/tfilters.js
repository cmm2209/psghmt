// Connects to the database.
const dbo = require("../db/conn");

// Defines routes.
const express = require("express", "mongodb");
const TitleRoutes = express.Router();
TitleRoutes.route("/tfilters").get(function (req, res) {
  let db_connect = dbo.getDb();

  //Convert tongue query to array
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
      .sort({ title: 1 })
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  } else if (cquery) {
    db_connect
      .collection("titles")
      .find({ century: { $in: cqueryIntArr } })
      .sort({ title: 1 })
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  } else if (tquery) {
    db_connect
      .collection("titles")
      .find({ tongue: { $in: tquery } })
      .sort({ title: 1 })
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  }
});

module.exports = TitleRoutes;
