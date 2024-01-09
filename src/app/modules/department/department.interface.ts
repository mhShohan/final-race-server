import { Types } from 'mongoose';

export interface IDepartment {
  name: string;
  shortName: string;
  facultyId: Types.ObjectId;
}
