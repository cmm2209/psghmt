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
      $lookup: {
        from: "authors",
        localField: "author",
        foreignField: "_id",
        as: "authordeets",
      },
    },
    {
      $set: {
        authorname: {
          $first: "$authordeets.authorSt",
        },
      },
    },
    {
      $unwind: {
        path: "$versions",
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $addFields: {
        "versions.checkedArr": {
          $cond: {
            if: {
              $isArray: "$versions.checked",
            },
            then: "$versions.checked",
            else: ["$versions.checked"],
          },
        },
        "versions.enteredArr": {
          $cond: {
            if: {
              $isArray: "$versions.entered",
            },
            then: "$versions.entered",
            else: ["$versions.entered"],
          },
        },
        "versions.approvedArr": {
          $cond: {
            if: {
              $isArray: "$versions.approved",
            },
            then: "$versions.approved",
            else: ["$versions.approved"],
          },
        },
      },
    },
    {
      $unwind: {
        path: "$versions.checked",
      },
    },
    {
      $unwind: {
        path: "$versions.entered",
      },
    },
    {
      $unwind: {
        path: "$versions.approved",
      },
    },
    {
      $addFields: {
        "versions.contributors": [
          "$versions.entered",
          "$versions.checked",
          "$versions.approved",
        ],
      },
    },
    {
      $unwind: {
        path: "$versions.contributors",
      },
    },
    {
      $addFields: {
        versionsArr: ["$versions"],
      },
    },
    {
      $set: {
        versions: "$versionsArr",
      },
    },
    {
      $group: {
        _id: {
          $first: "$versions.contributors",
        },
        treatises: {
          $addToSet: {
            title: "$title",
            authorname: "$authorname",
            versions: "$versions",
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
      $unset: [
        "treatises.versions.entered",
        "treatises.versions.checked",
        "treatises.versions.approved",
      ],
    },
    {
      $group: {
        _id: "$_id",
        treatises: {
          $addToSet: "$treatises",
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
    {
      $addFields: {
        "treatises.versions.contType": {
          $switch: {
            branches: [
              {
                case: {
                  $anyElementTrue: {
                    $map: {
                      input: "$treatises",
                      in: {
                        $anyElementTrue: {
                          $map: {
                            input: "$$this.versions",
                            in: {
                              $in: ["$_id", "$$this.checkedArr"],
                            },
                          },
                        },
                      },
                    },
                  },
                },
                then: "checked",
              },
              {
                case: {
                  $anyElementTrue: {
                    $map: {
                      input: "$treatises",
                      in: {
                        $anyElementTrue: {
                          $map: {
                            input: "$$this.versions",
                            in: {
                              $in: ["$_id", "$$this.enteredArr"],
                            },
                          },
                        },
                      },
                    },
                  },
                },
                then: "entered",
              },
              {
                case: {
                  $anyElementTrue: {
                    $map: {
                      input: "$treatises",
                      in: {
                        $anyElementTrue: {
                          $map: {
                            input: "$$this.versions",
                            in: {
                              $in: ["$_id", "$$this.approvedArr"],
                            },
                          },
                        },
                      },
                    },
                  },
                },
                then: "approved",
              },
            ],
            default: "error",
          },
        },
      },
    },
    {
      $project: {
        "treatises.title": 1,
        "treatises.authorname": 1,
        "treatises.versions.source": 1,
        "treatises.versions.url": 1,
        "treatises.versions.contType": 1,
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
      innerpipe[16],
      innerpipe[17],
      innerpipe[18],
      innerpipe[19]
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
      innerpipe[16],
      innerpipe[17],
      innerpipe[18],
      innerpipe[19]
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
      innerpipe[16],
      innerpipe[17],
      innerpipe[18],
      innerpipe[19]
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
      innerpipe[7],
      innerpipe[8],
      innerpipe[9],
      innerpipe[10],
      innerpipe[11],
      innerpipe[12],
      innerpipe[13],
      innerpipe[14],
      innerpipe[15],
      innerpipe[16],
      innerpipe[17],
      innerpipe[18],
      innerpipe[19]
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
