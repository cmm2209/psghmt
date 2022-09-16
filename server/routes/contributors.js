// Connects to the database.
const dbo = require("../db/conn");

// Defines routes.
const express = require("express", "mongodb");
const contRoutes = express.Router();

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
