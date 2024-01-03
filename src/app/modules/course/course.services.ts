/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from 'mongoose';
import BaseServices from '../baseServices';
import Course from './course.model';

class CourseService extends BaseServices<any> {
  constructor(model: any) {
    super(model)
  }

  async read(id: string) {
    return this.model.aggregate([
      { $match: { _id: new Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'faculties',
          localField: 'facultyId',
          foreignField: '_id',
          as: 'faculty'
        }
      },
      {
        $lookup: {
          from: 'departments',
          localField: 'departmentId',
          foreignField: '_id',
          as: 'department'
        }
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
          type: 1
        }
      }
    ])
  }
  async readAll() {
    return this.model.aggregate([
      {
        $lookup: {
          from: 'faculties',
          localField: 'facultyId',
          foreignField: '_id',
          as: 'faculty'
        }
      },
      {
        $lookup: {
          from: 'departments',
          localField: 'departmentId',
          foreignField: '_id',
          as: 'department'
        }
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
          type: 1
        }
      }
    ])
  }
}

const courseServices = new CourseService(Course);

export default courseServices;



