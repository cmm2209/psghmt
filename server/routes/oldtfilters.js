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
  if (tquery && cquery) {
    db_connect
      .collection("titles")
      .find({ tongue: { $in: tquery }, century: { $in: cquery } })
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  } else if (Array.isArray(tquery)) {
    db_connect
      .collection("titles")
      .find({ tongue: { $in: tquery } })
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  } else if (Array.isArray(req.query.century)) {
    let cquery1 = req.query.century;
    var cquery2 = [],
      obj,
      temp = cquery1,
      i;

    for (i = 0; i < temp.length; i++) {
      obj = {};
      obj = parseInt(temp[i]);
      cquery2.push(obj);
    }

    db_connect
      .collection("titles")
      .find({ century: { $in: cquery2 } })
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  } else if (req.query.century) {
    db_connect
      .collection("titles")
      .find({ century: parseInt(cquery) })
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
