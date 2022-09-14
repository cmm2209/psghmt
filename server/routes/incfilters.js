// Connects to the database.
const dbo = require("../db/conn");

// Defines routes.
const express = require("express", "mongodb");
const incfiltRoutes = express.Router();
incfiltRoutes.route("/incfilters").get(function (req, res) {
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

  // Pipeline
  const innerpipe = [
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

  const pipeline = [];
  if (tquery && cquery) {
    pipeline.push(
      { $match: { tongue: { $in: tquery } } },
      { $match: { century: { $in: cqueryIntArr } } },
      innerpipe[0],
      innerpipe[1],
      innerpipe[2],
      innerpipe[3]
    );
  } else if (tquery) {
    pipeline.push(
      { $match: { tongue: { $in: tquery } } },
      innerpipe[0],
      innerpipe[1],
      innerpipe[2],
      innerpipe[3]
    );
  } else if (cquery) {
    pipeline.push(
      { $match: { century: { $in: cqueryIntArr } } },
      innerpipe[0],
      innerpipe[1],
      innerpipe[2],
      innerpipe[3]
    );
  }

  // Filtering
  const coll = db_connect.collection("titles");
  const cursor = coll.aggregate(pipeline);
  cursor.toArray(function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

module.exports = incfiltRoutes;
