import { Types } from 'mongoose';

export interface IRegistrationInfo {
  facultyId: Types.ObjectId;
  departmentId: Types.ObjectId;

  // university fee
  tuitionFee: number;
  transport: number;
  library: number;
  centralSports: number;
  studentWelfare: number;
  treatment: number;
  roverScout: number;
  BNCC: number;
  computerFee: number;
  semesterExamFee: number;
  admitCard: number;
  othersFee: number;
  creditFee: number;

  // departmental fee
  centerFee: number;
  association: number;
  developmentFee: number;

  // date
  startDate: string;
  endDate: string;
}
