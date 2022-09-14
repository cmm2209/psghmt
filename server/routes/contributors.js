// Connects to the database.
const dbo = require("../db/conn");

// Defines routes.
const express = require("express", "mongodb");
const contRoutes = express.Router();

var pipeline = [
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

contRoutes.route("/contributors").get(function (req, res) {
  let db_connect = dbo.getDb("mtl_db");
  const coll = db_connect.collection("titles");
  const cursor = coll.aggregate(pipeline);
  cursor.toArray(function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

module.exports = contRoutes;
