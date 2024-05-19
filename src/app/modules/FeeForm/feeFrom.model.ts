import { Types, model, Schema } from 'mongoose';
import DepartmentalFeeForm from './departmentalFeeForm/departmentalFeeForm.model';
import SemesterFee from './semesterFeeForm/semesterFeeForm.model';
import ResidentialFeeForm from './residentialFeeForm/residentialFeeForm.model';

export interface IFeeFormRelation {
  departmentalFeeId: Types.ObjectId;
  semesterFeeId: Types.ObjectId;
  residentialFeeId?: Types.ObjectId;
}

const FeeFormSchema = new Schema<IFeeFormRelation>(
  {
    departmentalFeeId: { type: Schema.Types.ObjectId, required: true, ref: DepartmentalFeeForm },
    semesterFeeId: { type: Schema.Types.ObjectId, required: true, ref: SemesterFee },
    residentialFeeId: { type: Schema.Types.ObjectId, ref: ResidentialFeeForm },
  },
  { timestamps: true },
);

const FeeForm = model<IFeeFormRelation>('fee_form', FeeFormSchema);
export default FeeForm;
