import { Types } from 'mongoose';
import CustomError from '../../../errorHandler/customError';
import STATUS from '../../../lib/httpStatus';
import { IDepartmentalFeeForm } from './departmentalFeeForm.interfaces';
import DepartmentalFeeForm from './departmentalFeeForm.model';
import Student from '../../student/student.model';

class DepartmentalFeeFormServices {
  private model = DepartmentalFeeForm;

  async create(payload: IDepartmentalFeeForm, userId: string) {
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

  async update(id: string, payload: Partial<IDepartmentalFeeForm>) {
    await this._isExists(id);
    return this.model.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
  }

  private async _isExists(id: string) {
    if (!(await this.model.findById(id))) {
      throw new CustomError(STATUS.NOT_FOUND, 'Departmental Fee is not found!', 'NOT_FOUND');
    }
  }
}

const departmentalFeeFormServices = new DepartmentalFeeFormServices();
export default departmentalFeeFormServices;
