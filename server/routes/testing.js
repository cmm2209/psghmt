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
  const qvalue = req.query.tongue;
  for (const key in req.query) {
    console.log(key, req.query[key]);
  }

  if (Array.isArray(qvalue)) {
    db_connect
      .collection("titles")
      .find({ $or: [{ tongue: qvalue[0] }, { tongue: qvalue[1] }] })
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  } else {
    db_connect
      .collection("titles")
      .find({ tongue: qvalue })
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  }
});

module.exports = AuthorRoutes;
