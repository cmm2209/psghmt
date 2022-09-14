// Connects to the database.
const dbo = require("../db/conn");

// Defines routes.
const express = require("express", "mongodb");
const contRoutes = express.Router();

var pipeline = [
  {
    $group: {
      _id: "$author",
      treatises: {
        $push: { url: "$url", title: "$title" },
      },
    },
  },
  {
    $lookup: {
      from: "authors",
      localField: "_id",
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
      authorname: 1,
    },
  },
  {
    $unwind: {
      path: "$treatises",
    },
  },
  {
    $sort: {
      "treatises.title": 1,
    },
  },
  {
    $group: {
      _id: "$authorname",
      treatises: {
        $push: "$treatises",
      },
    },
  },
  {
    $project: {
      _id: 1,
      treatises: 1,
    },
  },
];

contRoutes.route("/authors").get(function (req, res) {
  let db_connect = dbo.getDb("mtl_db");
  const coll = db_connect.collection("titles");
  const cursor = coll.aggregate(pipeline);
  cursor.toArray(function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

module.exports = contRoutes;
