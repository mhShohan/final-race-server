import { Schema, model } from 'mongoose';
import { IDepartmentalFeeForm } from './departmentalFeeForm.interfaces';
import { academicSemester, academicYear } from '../../../constants/constants';

const departmentalFeeFormSchema = new Schema<IDepartmentalFeeForm>(
  {
    departmentId: { type: Schema.Types.ObjectId, required: true, ref: 'department' },
    studentId: { type: Schema.Types.ObjectId, required: true, ref: 'student' },
    year: { type: String, required: true, enum: academicYear },
    semester: { type: String, required: true, enum: academicSemester },
    session: { type: String, required: true },
    centerFee: { type: Number, default: 0 },
    association: { type: Number, default: 0 },
    developmentFee: { type: Number, default: 0 },
    amercementFee: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const DepartmentalFeeForm = model<IDepartmentalFeeForm>(
  'departmental_fee_form',
  departmentalFeeFormSchema,
);

export default DepartmentalFeeForm;
