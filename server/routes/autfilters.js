// Connects to the database.
const dbo = require("../db/conn");

// Defines routes.
const express = require("express", "mongodb");
const autfiltRoutes = express.Router();
autfiltRoutes.route("/autfilters").get(function (req, res) {
  let db_connect = dbo.getDb("mtl_db");

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

  // Pipeline
  const innerpipe = [
    {
      $group: {
        _id: "$author",
        treatises: {
          $push: "$$ROOT",
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
      $sort: {
        _id: 1,
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
      innerpipe[3],
      innerpipe[4],
      innerpipe[5],
      innerpipe[6],
      innerpipe[7]
    );
  } else if (tquery) {
    pipeline.push(
      { $match: { tongue: { $in: tquery } } },
      innerpipe[0],
      innerpipe[1],
      innerpipe[2],
      innerpipe[3],
      innerpipe[4],
      innerpipe[5],
      innerpipe[6],
      innerpipe[7]
    );
  } else if (cquery) {
    pipeline.push(
      { $match: { century: { $in: cqueryIntArr } } },
      innerpipe[0],
      innerpipe[1],
      innerpipe[2],
      innerpipe[3],
      innerpipe[4],
      innerpipe[5],
      innerpipe[6],
      innerpipe[7]
    );
  } else {
    pipeline.push(
      innerpipe[0],
      innerpipe[1],
      innerpipe[2],
      innerpipe[3],
      innerpipe[4],
      innerpipe[5],
      innerpipe[6],
      innerpipe[7]
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

module.exports = autfiltRoutes;
