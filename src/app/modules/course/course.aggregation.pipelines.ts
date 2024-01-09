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
    {
      $lookup: {
        from: 'departments',
        localField: 'departmentId',
        foreignField: '_id',
        as: 'department',
      },
    },
    { $unwind: '$faculty' },
    { $unwind: '$department' },
    {
      $project: {
        title: 1,
        code: 1,
        credit: 1,
        faculty: '$faculty.name',
        department: '$department.name',
        facultyId: '$faculty._id',
        departmentId: '$department._id',
        year: 1,
        semester: 1,
        type: 1,
      },
    },
  ];
};

const courseAggregationPipelines = { mergeCollections };

export default courseAggregationPipelines;
