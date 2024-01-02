import { Types } from "mongoose";
import CustomError from "../../errorHandler/customError";
import STATUS from "../../lib/httpStatus";
import Faculty from "../faculty/faculty.model";
import { IDepartment } from "./department.interface";
import Department from "./department.model";

class DepartmentService {
  private model = Department

  async create(payload: IDepartment) {
    if (!await Faculty.findById(payload.facultyId)) {
      throw new CustomError(STATUS.NOT_FOUND, 'Faculty is not found', 'NOT_FOUND')
    }

    return this.model.create(payload)
  }

  async read(id: string) {
    await this._isExists(id)

    return this.model.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(id)
        }
      },
      {
        $lookup: {
          from: "faculties",
          localField: "facultyId",
          foreignField: "_id",
          as: "faculty",
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
          updatedAt: 1
        }
      }
    ])
  }

  async readAll() {
    return this.model.aggregate([
      {
        $lookup: {
          from: "faculties",
          localField: "facultyId",
          foreignField: "_id",
          as: "faculty",
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
          updatedAt: 1
        }
      }
    ])
  }

  async update(id: string, payload: Partial<IDepartment>) {
    await this._isExists(id)

    return this.model.findByIdAndUpdate(id, payload, { new: true, runValidators: true })
  }

  private async _isExists(id: string) {
    if (!await this.model.findById(id)) {
      throw new CustomError(STATUS.NOT_FOUND, 'Department is not found!', 'NOT_FOUND');
    }
  }
}

const departmentServices = new DepartmentService();

export default departmentServices;
