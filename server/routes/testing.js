const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const AuthorRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
// const ObjectId = require("mongodb").ObjectId;

AuthorRoutes.route("/testing").get(function (req, res) {
  let db_connect = dbo.getDb();
  // for (const key in req.query) {
  //   console.log(key, req.query[key], req.query.century);
  // }

  if (Array.isArray(req.query.century)) {
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
  } else {
    db_connect
      .collection("titles")
      .find({ century: parseInt(req.query.century) })
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
    //  console.log(parseInt(req.query.century));
  }
});

module.exports = AuthorRoutes;
