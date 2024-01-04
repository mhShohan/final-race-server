/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from 'mongoose';
import { adminRoleConstant } from '../../constants/adminRoleConstant';
import CustomError from '../../errorHandler/customError';
import generateToken from '../../utils/generateToken';
import verifyPassword from '../../utils/verifyPassword';
import BaseServices from '../baseServices';
import Department from '../department/department.model';
import Hall from '../hall/hall.model';
import { IAdmin } from './admin.interface';
import Admin from './admin.model';

class AdminService extends BaseServices<any> {
  constructor(model: any) {
    super(model)
  }

  async create(payload: IAdmin) {

    if (payload.role === adminRoleConstant.CHAIRMAN && !payload.departmentId) {
      if (payload.departmentId) {
        if (!await Department.findById(payload.departmentId)) {
          throw new CustomError(404, 'Department is not found!')
        }
      }

      throw new CustomError(400, 'To create a CHAIRMAN account must assign a department!')

    } else if (payload.role === adminRoleConstant.DEPARTMENT_OPERATOR && !payload.departmentId) {
      if (payload.departmentId) {
        if (!await Department.findById(payload.departmentId)) {
          throw new CustomError(404, 'Department is not found!')
        }
      }

      throw new CustomError(400, 'To create a DEPARTMENT_OPERATOR account must assign a department!')

    } else if (payload.role === adminRoleConstant.HALL_OPERATOR && !payload.hallId) {
      if (payload.hallId) {
        if (!await Hall.findById(payload.hallId)) {
          throw new CustomError(400, 'Hall is not found!')
        }
      }

      throw new CustomError(404, 'To create a HALL_OPERATOR account must assign a hall!')
    }

    return this.model.create(payload)
  }

  async login(payload: { email: string, password: string }) {
    const user = await this.model.findOne({ email: payload.email }).select('+password')

    if (!user) throw new CustomError(400, 'Wrong Credentials!')
    await verifyPassword(payload.password, user.password)
    const token = generateToken({ _id: user._id, email: user.email, role: user.role })

    return {
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    }
  }

  async read(id: string) {
    return this.model.aggregate([
      { $match: { _id: new Types.ObjectId(id) } },
      {
        $lookup: {
          from: "departments",
          localField: "departmentId",
          foreignField: "_id",
          as: "department",
        },
      },
      {
        $lookup: {
          from: "halls",
          localField: "hallId",
          foreignField: "_id",
          as: "hall",
        },
      },
      {
        $unwind: {
          path: '$department',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind: {
          path: '$hall',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          name: 1,
          email: 1,
          role: 1,
          department: '$department.name',
          departmentId: '$department._id',
          hall: '$hall.name',
          hallId: '$hall._id',
        }
      }
    ])

  }
  async readAll() {
    return this.model.aggregate([
      {
        $lookup: {
          from: "departments",
          localField: "departmentId",
          foreignField: "_id",
          as: "department",
        },
      },
      {
        $lookup: {
          from: "halls",
          localField: "hallId",
          foreignField: "_id",
          as: "hall",
        },
      },
      {
        $unwind: {
          path: '$department',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind: {
          path: '$hall',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          name: 1,
          email: 1,
          role: 1,
          department: '$department.name',
          departmentId: '$department._id',
          hall: '$hall.name',
          hallId: '$hall._id',
        }
      }
    ])
  }
}

const adminServices = new AdminService(Admin);

export default adminServices;



