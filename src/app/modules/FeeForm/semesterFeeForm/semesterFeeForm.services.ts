
import SemesterFee from './semesterFeeForm.model';
import { ISemesterFeeForm } from './semesterFeeForm.interfaces';
import { Types } from 'mongoose';
import Student from '../../student/student.model';
import CustomError from '../../../errorHandler/customError';
import STATUS from '../../../lib/httpStatus';

class SemesterFeeServices {
  private model = SemesterFee;

  async create(payload: ISemesterFeeForm, userId: string) {
    const student = await Student.findById(userId)
    if (!student) throw new CustomError(STATUS.NOT_FOUND, 'Student is not found!', 'NOT_FOUND');

    payload.departmentId = student?.departmentId as Types.ObjectId;
    payload.studentId = student._id as Types.ObjectId;

    return this.model.create(payload);
  }

  async read(id: string) {
    await this._isExists(id);
    return this.model.findById(id);
  }

  async readAll() {
    return this.model.find({});
  }

  async update(id: string, payload: Partial<ISemesterFeeForm>) {
    await this._isExists(id);
    return this.model.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
  }

  private async _isExists(id: string) {
    if (!(await this.model.findById(id))) {
      throw new CustomError(STATUS.NOT_FOUND, 'Semester Fee is not found!', 'NOT_FOUND');
    }
  }
}

const semesterFeeServices = new SemesterFeeServices();
export default semesterFeeServices;
