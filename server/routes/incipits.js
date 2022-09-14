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
    },
  },
  {
    $sort: {
      incipit: 1,
    },
  },
  {
    $project: {
      _id: 1,
      incipit: 1,
      title: 1,
      source: 1,
      version1: 1,
      version2: 1,
      version3: 1,
      version4: 1,
      url: 1,
      tongue: 1,
      authorname: 1,
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
