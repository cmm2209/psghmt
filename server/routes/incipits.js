// Connects to the database.
const dbo = require("../db/conn");

// Defines routes.
const express = require("express", "mongodb");
const incRoutes = express.Router();

var pipeline = [
  {
    $lookup: {
      from: "authors",
      localField: "author",
      foreignField: "_id",
      as: "authordeets",
    },
  },
  {
    $set: {
      authorname: "$authordeets.authorSt",
      inc1: { $first: "$versions.incipit" },
    },
  },
  {
    $sort: {
      inc1: 1,
    },
  },
];

incRoutes.route("/incipits").get(function (req, res) {
  let db_connect = dbo.getDb("mtl_db");
  const coll = db_connect.collection("titles");
  const cursor = coll.aggregate(pipeline);
  cursor.toArray(function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

module.exports = incRoutes;
