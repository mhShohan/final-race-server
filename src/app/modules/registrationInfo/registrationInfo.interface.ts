import { Types } from "mongoose"

export interface IRegistrationInfo {
  facultyId: Types.ObjectId
  departmentId: Types.ObjectId
  tuitionFee: number
  transport: number
  library: number
  centralSports: number
  studentWelfare: number
  treatment: number
  roverScout: number
  BNCC: number
  computerFee: number
  semesterExamFee: number
  admitCard: number
  othersFee: number
}