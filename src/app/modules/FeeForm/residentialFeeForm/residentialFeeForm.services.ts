import { Types } from 'mongoose';
import Student from '../../student/student.model';
import CustomError from '../../../errorHandler/customError';
import STATUS from '../../../lib/httpStatus';
import ResidentialFeeForm from './residentialFeeForm.model';
import { IResidentialFeeForm } from './residentialFeeForm.interface';
// import monthDifference from '../../../utils/monthDifference';

class ResidentialFeeFormServices {
  private model = ResidentialFeeForm;

  async create(payload: IResidentialFeeForm, userId: string) {
    const student = await Student.findById(userId);
    if (!student) throw new CustomError(STATUS.NOT_FOUND, 'Student is not found!', 'NOT_FOUND');

    payload.hallId = student?.hallId as Types.ObjectId;
    payload.studentId = student._id as Types.ObjectId;
    // payload.totalFee = payload.fee * monthDifference(payload.from, payload.to);

    return this.model.create(payload);
  }

  async read(id: string) {
    await this._isExists(id);
    return this.model.findById(id);
  }

  async readAll() {
    return this.model.find({});
  }

  async update(id: string, payload: Partial<IResidentialFeeForm>) {
    return this.model.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
  }

  private async _isExists(id: string) {
    const exists = await this.model.findById(id);

    if (!exists) {
      throw new CustomError(STATUS.NOT_FOUND, 'Residential Fee Form is not found!', 'NOT_FOUND');
    }

    return exists;
  }
}

const residentialFeeFormServices = new ResidentialFeeFormServices();
export default residentialFeeFormServices;
