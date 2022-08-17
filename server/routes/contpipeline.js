const Contpipeline = [
  {
    $match: {
      $or: [
        {
          checked: {
            $exists: true,
          },
        },
        {
          version1: {
            $exists: true,
          },
        },
        {
          version2: {
            $exists: true,
          },
        },
        {
          version3: {
            $exists: true,
          },
        },
        {
          version4: {
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
      _id: "$contributors",
      titles: {
        $push: "$title",
      },
    },
  },
  {
    $project: {
      _id: 1,
      titles: {
        $setUnion: ["$titles", []],
      },
    },
  },
];
