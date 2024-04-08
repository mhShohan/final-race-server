import CustomError from '../../errorHandler/customError';
import STATUS from '../../lib/httpStatus';
import { IRegistrationInfo } from './registrationInfo.interface';
import RegistrationInfo from './registrationInfo.model';

class RegistrationInfoServices {
  private model = RegistrationInfo

  async create(payload: IRegistrationInfo) {
    return this.model.create(payload);
  }

  async read(id: string) {
    await this._isExists(id);
    return this.model.findById(id);
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
