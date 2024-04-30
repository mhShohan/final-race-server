import { Types } from "mongoose"

export interface IResidentialFeeForm {
  hallId: Types.ObjectId
  studentId: Types.ObjectId
  fee: number
  from: string
  to: string
  totalFee: number
  othersFee: number
}