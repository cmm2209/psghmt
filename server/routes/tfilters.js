const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const AuthorRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
// const ObjectId = require("mongodb").ObjectId;

AuthorRoutes.route("/tfilters").get(function (req, res) {
  let db_connect = dbo.getDb();
  var tquery = req.query.tongue;
  var cquery = req.query.century;

  if (Array.isArray(cquery)) {
    var cqueryIntArr = [],
      obj,
      temp = cquery,
      i;
    for (i = 0; i < temp.length; i++) {
      obj = {};
      obj = parseInt(temp[i]);
      cqueryIntArr.push(obj);
    }
    if (Array.isArray(tquery) && cquery) {
      db_connect
        .collection("titles")
        .find({ tongue: { $in: tquery }, century: { $in: cqueryIntArr } })
        .toArray(function (err, result) {
          if (err) throw err;
          res.json(result);
        });
    } else if (tquery && cquery) {
      db_connect
        .collection("titles")
        .find({ tongue: tquery, century: { $in: cqueryIntArr } })
        .toArray(function (err, result) {
          if (err) throw err;
          res.json(result);
        });
    } else {
      db_connect
        .collection("titles")
        .find({ century: { $in: cqueryIntArr } })
        .toArray(function (err, result) {
          if (err) throw err;
          res.json(result);
        });
    }
  } else if (cquery) {
    var cqueryInt = parseInt(cquery);
    if (Array.isArray(tquery) && cquery) {
      db_connect
        .collection("titles")
        .find({ tongue: { $in: tquery }, century: cqueryInt })
        .toArray(function (err, result) {
          if (err) throw err;
          res.json(result);
        });
    } else if (tquery && cquery) {
      db_connect
        .collection("titles")
        .find({ tongue: tquery, century: cqueryInt })
        .toArray(function (err, result) {
          if (err) throw err;
          res.json(result);
        });
    } else {
      db_connect
        .collection("titles")
        .find({ century: cqueryInt })
        .toArray(function (err, result) {
          if (err) throw err;
          res.json(result);
        });
    }
  } else if (Array.isArray(tquery)) {
    db_connect
      .collection("titles")
      .find({ tongue: { $in: tquery } })
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  } else if (tquery) {
    db_connect
      .collection("titles")
      .find({ tongue: tquery })
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  }
  /**
  else if (req.query.author) {
    let aqueryid = req.query.author;
    db_connect
      .collection("titles")
      .find({ author: ObjectId(aqueryid) })
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  }
     */
});

module.exports = AuthorRoutes;
