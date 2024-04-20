import CustomError from '../../errorHandler/customError';
import STATUS from '../../lib/httpStatus';
import SemesterFee from './semesterFeeForm.model';
import { ISemesterFeeForm } from './semesterFeeForm.interfaces';

class SemesterFeeServices {
  private model = SemesterFee;

  async create(payload: ISemesterFeeForm) {
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
