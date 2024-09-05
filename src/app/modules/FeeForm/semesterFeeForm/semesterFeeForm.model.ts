import { Schema, model } from 'mongoose';
import { ISemesterFeeForm } from './semesterFeeForm.interfaces';
import { academicSemester, academicYear } from '../../../constants/constants';

const SemesterFeeSchema = new Schema<ISemesterFeeForm>(
  {
    departmentId: { type: Schema.Types.ObjectId, required: true },
    studentId: { type: Schema.Types.ObjectId, required: true },
    year: { type: String, required: true, enum: academicYear },
    semester: { type: String, required: true, enum: academicSemester },
    session: { type: String, required: true },
    tuitionFee: { type: Number, default: 0 },
    transport: { type: Number, default: 0 },
    library: { type: Number, default: 0 },
    centralSports: { type: Number, default: 0 },
    creditFee: { type: Number, default: 0 },
    studentWelfare: { type: Number, default: 0 },
    treatment: { type: Number, default: 0 },
    roverScout: { type: Number, default: 0 },
    BNCC: { type: Number, default: 0 },
    computerFee: { type: Number, default: 0 },
    semesterExamFee: { type: Number, default: 0 },
    admitCard: { type: Number, default: 0 },
    othersFee: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const SemesterFee = model<ISemesterFeeForm>('Semester_Fee_form', SemesterFeeSchema);
export default SemesterFee;
