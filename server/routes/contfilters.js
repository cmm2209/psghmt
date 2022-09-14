// Connects to the database.
const dbo = require("../db/conn");

// Defines routes.
const express = require("express", "mongodb");
const contfiltRoutes = express.Router();
contfiltRoutes.route("/contfilters").get(function (req, res) {
  let db_connect = dbo.getDb("mtl_db");

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
      $match: {
        $or: [
          {
            entered: {
              $exists: true,
            },
          },
          {
            version1: {
              $exists: true,
            },
          },
        ],
      },
    },
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
        authorname: { $first: "$authordeets.authorSt" },
      },
    },
    {
      $unset: "authordeets",
    },
    {
      $unwind: {
        path: "$checked",
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $unwind: {
        path: "$entered",
      },
    },
    {
      $unwind: {
        path: "$approved",
      },
    },
    {
      $set: {
        contributors: ["$entered", "$checked", "$approved"],
      },
    },
    {
      $unwind: {
        path: "$contributors",
      },
    },
    {
      $group: {
        _id: "$_id",
        contributors: {
          $addToSet: "$contributors",
        },
        title: {
          $first: "$title",
        },
        url: {
          $first: "$url",
        },
        source: {
          $first: "$source",
        },
        authorname: {
          $first: "$authorname",
        },
      },
    },
    {
      $unwind: {
        path: "$contributors",
      },
    },
    {
      $group: {
        _id: "$contributors",
        treatises: {
          $push: {
            url: "$url",
            title: "$title",
            source: "$source",
            authorname: "$authorname",
          },
        },
      },
    },
    {
      $sort: {
        _id: 1,
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
        _id: "$_id",
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
      innerpipe[7],
      innerpipe[8],
      innerpipe[9],
      innerpipe[10],
      innerpipe[11],
      innerpipe[12],
      innerpipe[13],
      innerpipe[14],
      innerpipe[15],
      innerpipe[16]
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
      innerpipe[7],
      innerpipe[8],
      innerpipe[9],
      innerpipe[10],
      innerpipe[11],
      innerpipe[12],
      innerpipe[13],
      innerpipe[14],
      innerpipe[15],
      innerpipe[16]
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
      innerpipe[7],
      innerpipe[8],
      innerpipe[9],
      innerpipe[10],
      innerpipe[11],
      innerpipe[12],
      innerpipe[13],
      innerpipe[14],
      innerpipe[15],
      innerpipe[16]
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

module.exports = contfiltRoutes;
