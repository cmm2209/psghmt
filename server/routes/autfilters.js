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

  // Filtering
  if (tquery && cquery) {
    const coll = db_connect.collection("titles");
    const cursor = coll.aggregate([
      { $match: { tongue: { $in: tquery }, century: { $in: cqueryIntArr } } },
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
    ]);
    cursor.toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
  } else if (cquery) {
    const coll = db_connect.collection("titles");
    const cursor = coll.aggregate([
      { $match: { century: { $in: cqueryIntArr } } },
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
    ]);
    cursor.toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
  } else if (tquery) {
    const coll = db_connect.collection("titles");
    const cursor = coll.aggregate([
      { $match: { tongue: { $in: tquery } } },
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
    ]);
    cursor.toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
  }
});

module.exports = autfiltRoutes;
