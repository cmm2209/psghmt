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

  // Filtering
  if (tquery && cquery) {
    const coll = db_connect.collection("titles");
    const cursor = coll.aggregate([
      { $match: { tongue: { $in: tquery }, century: { $in: cqueryIntArr } } },
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
    ]);
    cursor.toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
  }
});

module.exports = contfiltRoutes;
