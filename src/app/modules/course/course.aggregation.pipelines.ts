/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from 'mongoose';

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
        department: '$department.shortName',
        facultyId: '$faculty._id',
        departmentId: '$department._id',
        year: 1,
        semester: 1,
        type: 1,
      },
    },
  ];
};

const filterPipeline = (query: Record<string, unknown>) => {
  const fieldQueries: any = [{}];

  if (query.department) {
    fieldQueries.push({ departmentId: { $eq: new Types.ObjectId(query.department as string) } });
  }

  if (query.year) {
    fieldQueries.push({ year: { $eq: query.year } });
  }

  if (query.semester) {
    fieldQueries.push({ semester: { $eq: query.semester } });
  }

  return [
    {
      $match: {
        $and: [...fieldQueries],
      },
    },
  ];
};

const courseAggregationPipelines = { mergeCollections, filterPipeline };

export default courseAggregationPipelines;
