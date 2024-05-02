import { Types } from "mongoose"

export interface IResidentialFeeForm {
  hallId: Types.ObjectId
  studentId: Types.ObjectId
  session: string;
  fee: number
  from: string
  to: string
  totalResidentFee: number
  othersFee?: number
}