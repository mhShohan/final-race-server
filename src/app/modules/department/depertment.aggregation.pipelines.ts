const mergeCollections = () => {
  return [
    {
      $lookup: {
        from: 'faculties',
        localField: 'facultyId',
        foreignField: '_id',
        as: 'faculty',
      },
    },
    { $unwind: '$faculty' },
    {
      $project: {
        name: 1,
        shortName: 1,
        facultyId: 1,
        facultyName: '$faculty.name',
        createdAt: 1,
        updatedAt: 1,
      },
    },
  ];
};

const departmentAggregationPipelines = { mergeCollections };

export default departmentAggregationPipelines;
