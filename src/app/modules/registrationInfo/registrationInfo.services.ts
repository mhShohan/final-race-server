import { Types } from 'mongoose';
import CustomError from '../../errorHandler/customError';
import STATUS from '../../lib/httpStatus';
import Admin from '../admin/admin.model';
import { IRegistrationInfo } from './registrationInfo.interface';
import RegistrationInfo from './registrationInfo.model';
import Student from '../student/student.model';

class RegistrationInfoServices {
  private model = RegistrationInfo;

  async create(payload: IRegistrationInfo) {
    return this.model.create(payload);
  }

  async read(id: string) {
    const admin = await Admin.findById(id);
    const student = await Student.findById(id);

    if (!admin && !student)
      throw new CustomError(STATUS.NOT_FOUND, 'Admin or Student is not found!', 'NOT_FOUND');
    const departmentId = admin?.departmentId || student?.departmentId;

    return await this.model.findOne({ departmentId });
  }

  async checkStatus(id: Types.ObjectId) {
    const registrationInfo = await this.model.findOne({ departmentId: id });

    const today = new Date();
    const endDate = new Date(registrationInfo?.endDate as string);

    if (today >= endDate) {
      return {
        startDate: registrationInfo?.startDate,
        endDate: registrationInfo?.endDate,
        status: 'Closed',
      };
    } else {
      return {
        startDate: registrationInfo?.startDate,
        endDate: registrationInfo?.endDate,
        status: 'Ongoing',
      };
    }
  }

  async update(id: string, payload: Partial<IRegistrationInfo>) {
    await this._isExists(id);
    return this.model.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
  }

  private async _isExists(id: string) {
    if (!(await this.model.findById(id))) {
      throw new CustomError(STATUS.NOT_FOUND, 'Registration Info is not found!', 'NOT_FOUND');
    }
  }
}

const registrationInfoServices = new RegistrationInfoServices();
export default registrationInfoServices;
