import { Types } from 'mongoose';
import { TSemesters, TYears } from '../../../interfaces/interface';

export interface ISemesterFeeForm {
  departmentId: Types.ObjectId;
  studentId: Types.ObjectId;
  year: TYears;
  semester: TSemesters;
  session: string;

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
  othersFee?: number;
}
