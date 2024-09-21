import { Schema, model } from 'mongoose';
import { IResidentialFeeForm } from './residentialFeeForm.interface';

const residentialFeeFormSchema = new Schema<IResidentialFeeForm>(
  {
    hallId: { type: Schema.Types.ObjectId, required: true },
    studentId: { type: Schema.Types.ObjectId, required: true },
    session: { type: String, required: true },
    fee: { type: Number, default: 0 },
    from: { type: Date },
    to: { type: Date },
    totalResidentFee: { type: Number, default: 0 },
    othersFee: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const ResidentialFeeForm = model<IResidentialFeeForm>(
  'residential_fee_form',
  residentialFeeFormSchema,
);
export default ResidentialFeeForm;


