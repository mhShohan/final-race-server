/* eslint-disable @typescript-eslint/no-explicit-any */
import BaseServices from '../baseServices';
import Hall from './hall.model';

class HallService extends BaseServices<any> {
  constructor(model: any) {
    super(model)
  }
}

const hallServices = new HallService(Hall);

export default hallServices;
