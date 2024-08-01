/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model } from 'mongoose';
import CustomError from '../errorHandler/customError';
import STATUS from '../lib/httpStatus';

class BaseServices<T> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    if (!model || !(model.prototype instanceof Model)) {
      throw new Error('Invalid Mongoose model!');
    }

    this.model = model;
  }

  async create(payload: any, userId?: string) {
    console.log(userId);
    return this.model.create(payload);
  }

  async read(id: string) {
    await this._isExists(id);
    return this.model.findById(id);
  }

  async readAll(query: Record<string, unknown> = {}): Promise<any> {
    return this.model.find(query);
  }

  async update(id: string, payload: any) {
    await this._isExists(id);
    return this.model.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
  }

  async delete(id: string) {
    await this._isExists(id);
    return this.model.findByIdAndDelete(id);
  }

  protected async _isExists(id: string) {
    const result = await this.model.findById(id);

    if (!result) {
      throw new CustomError(STATUS.NOT_FOUND, 'Data is not found!', 'NOT_FOUND');
    }

    return result;
  }
}

export default BaseServices;
