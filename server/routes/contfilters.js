const express = require("express", "mongodb");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const contfiltRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
// const ObjectId = require("mongodb").ObjectId;

contfiltRoutes.route("/contfilters").get(function (req, res) {
  let db_connect = dbo.getDb("mtl_db");
  var tquery = req.query.tongue;
  var cquery = req.query.century;

  if (Array.isArray(cquery)) {
    var cqueryIntArr = [],
      obj,
      temp = cquery,
      i;
    for (i = 0; i < temp.length; i++) {
      obj = {};
      obj = parseInt(temp[i]);
      cqueryIntArr.push(obj);
    }
    if (Array.isArray(tquery) && cquery) {
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
    } else if (tquery && cquery) {
      const coll = db_connect.collection("titles");
      const cursor = coll.aggregate([
        { $match: { tongue: tquery, century: { $in: cqueryIntArr } } },
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
    } else {
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
    }
  } else if (cquery) {
    var cqueryInt = parseInt(cquery);
    if (Array.isArray(tquery) && cquery) {
      const coll = db_connect.collection("titles");
      const cursor = coll.aggregate([
        { $match: { tongue: { $in: tquery }, century: cqueryInt } },
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
    } else if (tquery && cquery) {
      const coll = db_connect.collection("titles");
      const cursor = coll.aggregate([
        { $match: { tongue: tquery, century: cqueryInt } },
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
    } else {
      const coll = db_connect.collection("titles");
      const cursor = coll.aggregate([
        { $match: { century: cqueryInt } },
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
  } else if (Array.isArray(tquery)) {
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
  } else if (tquery) {
    const coll = db_connect.collection("titles");
    const cursor = coll.aggregate([
      { $match: { tongue: tquery } },
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
