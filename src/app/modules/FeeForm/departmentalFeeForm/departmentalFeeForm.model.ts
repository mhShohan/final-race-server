import { Schema, model } from 'mongoose';
import { IDepartmentalFeeForm } from './departmentalFeeForm.interfaces';
import { academicSemester, academicYear } from '../../../constants/constants';

const departmentalFeeFormSchema = new Schema<IDepartmentalFeeForm>(
  {
    departmentId: { type: Schema.Types.ObjectId, required: true },
    studentId: { type: Schema.Types.ObjectId, required: true },
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
  'Departmental_Fee_Form',
  departmentalFeeFormSchema,
);

export default DepartmentalFeeForm;
