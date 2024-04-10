import mongoose, { Types } from 'mongoose';
import CustomError from '../../errorHandler/customError';
import STATUS from '../../lib/httpStatus';
import Faculty from '../faculty/faculty.model';
import { IDepartment } from './department.interface';
import Department from './department.model';
import departmentAggregationPipelines from './depertment.aggregation.pipelines';
import RegistrationInfo from '../registrationInfo/registrationInfo.model';

class DepartmentService {
  private model = Department;

  async create(payload: IDepartment) {
    if (!(await Faculty.findById(payload.facultyId))) {
      throw new CustomError(STATUS.NOT_FOUND, 'Faculty is not found', 'NOT_FOUND');
    }

    let result;

    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      result = await this.model.create([payload], { session });
      await RegistrationInfo.create([{
        departmentId: result[0]._id,
        facultyId: result[0].facultyId
      }], { session });

      await session.commitTransaction()

    } catch (error) {
      await session.abortTransaction();
    } finally {
      await session.endSession();
    }
    return result
  }

  async read(id: string) {
    await this._isExists(id);

    return this.model.aggregate([
      { $match: { _id: new Types.ObjectId(id) } },
      ...departmentAggregationPipelines.mergeCollections(),
    ]);
  }

  async readAll() {
    return this.model.aggregate([...departmentAggregationPipelines.mergeCollections()]);
  }

  async update(id: string, payload: Partial<IDepartment>) {
    await this._isExists(id);

    return this.model.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
  }

  private async _isExists(id: string) {
    if (!(await this.model.findById(id))) {
      throw new CustomError(STATUS.NOT_FOUND, 'Department is not found!', 'NOT_FOUND');
    }
  }
}

const departmentServices = new DepartmentService();

export default departmentServices;
