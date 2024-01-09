/* eslint-disable @typescript-eslint/no-explicit-any */
import BaseServices from '../baseServices';
import Faculty from './faculty.model';

class FacultyService extends BaseServices<any> {
  constructor(model: any) {
    super(model);
  }

  // async create(payload: IFaculty) {
  //   return this.model.create(payload);
  // }

  // async read(id: string) {
  //   await this._isExists(id)
  //   return this.model.findById(id);
  // }

  // async readAll() {
  //   return this.model.find();
  // }

  // async update(id: string, payload: IFaculty) {
  //   await this._isExists(id)
  //   return this.model.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
  // }

  // private async _isExists(id: string) {
  //   if (!await this.model.findById(id)) {
  //     throw new CustomError(STATUS.NOT_FOUND, 'Faculty is not found!', 'NOT_FOUND');
  //   }
  // }
}

const facultyServices = new FacultyService(Faculty);

export default facultyServices;
