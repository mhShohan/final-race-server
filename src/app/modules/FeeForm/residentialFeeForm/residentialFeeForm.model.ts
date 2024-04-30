import { Schema, model } from "mongoose";
import { IResidentialFeeForm } from "./residentialFeeForm.interface";

const residentialFeeFormSchema = new Schema<IResidentialFeeForm>({
  hallId: { type: Schema.Types.ObjectId, required: true },
  studentId: { type: Schema.Types.ObjectId, required: true },
  fee: { type: Number, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  totalFee: { type: Number, required: true },
  othersFee: { type: Number, required: true },
}, { timestamps: true })

const ResidentialFeeForm = model<IResidentialFeeForm>('residential-fee-form', residentialFeeFormSchema)
export default ResidentialFeeForm