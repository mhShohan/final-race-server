import { Types, model, Schema } from 'mongoose';
import DepartmentalFeeForm from './departmentalFeeForm/departmentalFeeForm.model';
import SemesterFee from './semesterFeeForm/semesterFeeForm.model';
import ResidentialFeeForm from './residentialFeeForm/residentialFeeForm.model';
import {
  academicSemester,
  academicType,
  academicYear,
  semesterFeeFormStatus,
} from '../../constants/constants';
import { ICourse } from '../course/course.interface';
import { ISemesterFeeFormStatus, TSemesters, TYears } from '../../interfaces/interface';

export interface IFeeFormRelation {
  year: TYears;
  semester: TSemesters;
  studentId: Types.ObjectId;
  departmentalFeeId: Types.ObjectId;
  semesterFeeId: Types.ObjectId;
  residentialFeeId?: Types.ObjectId;
  courses: ICourse[];
  status: ISemesterFeeFormStatus;
  declineMessage?: string;
}

const courseSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: [true, 'Course title is required!'], unique: true },
    code: { type: String, required: [true, 'Course code is required!'], unique: true },
    credit: { type: Number, required: [true, 'Credit is required!'] },
    facultyId: {
      type: Schema.Types.ObjectId,
      required: [true, 'facultyId is required!'],
      ref: 'faculty',
    },
    departmentId: {
      type: Schema.Types.ObjectId,
      required: [true, 'departmentId is required!'],
      ref: 'department',
    },
    year: { type: String, enum: academicYear, required: true },
    semester: { type: String, enum: academicSemester, required: true },
    type: { type: String, enum: academicType, required: true },
  },
  { _id: false },
);

const FeeFormSchema = new Schema<IFeeFormRelation>(
  {
    semester: { type: String, enum: academicSemester, required: true },
    year: { type: String, enum: academicYear, required: true },
    studentId: { type: Schema.Types.ObjectId, required: true, ref: 'student' },
    departmentalFeeId: { type: Schema.Types.ObjectId, required: true, ref: DepartmentalFeeForm },
    semesterFeeId: { type: Schema.Types.ObjectId, required: true, ref: SemesterFee },
    residentialFeeId: { type: Schema.Types.ObjectId, ref: ResidentialFeeForm },
    courses: [courseSchema],
    status: { type: String, enum: semesterFeeFormStatus, required: true },
    declineMessage: { type: String },
  },
  { timestamps: true },
);

const FeeForm = model<IFeeFormRelation>('fee_form', FeeFormSchema);
export default FeeForm;
