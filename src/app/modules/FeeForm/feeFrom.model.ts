import { model, Schema, Types } from 'mongoose';
import {
  academicSemester,
  academicType,
  academicYear,
  semesterFeeFormStatus,
} from '../../constants/constants';
import { ISemesterFeeFormStatus, TSemesters, TYears } from '../../interfaces/interface';
import { ICourse } from '../course/course.interface';

export interface IFeeFormRelation {
  year: TYears;
  semester: TSemesters;
  studentId: Types.ObjectId;
  departmentId: Types.ObjectId;
  departmentalFeeId: Types.ObjectId;
  semesterFeeId: Types.ObjectId;
  residentialFeeId?: Types.ObjectId;
  courses: ICourse[];
  examType: 'Regular' | 'Retake' | 'Improvement';
  status: ISemesterFeeFormStatus;
  declineMessage?: string;
}

const courseSchema = new Schema(
  {
    // _id: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: [ true, 'Course title is required!' ] },
    code: { type: String, required: [ true, 'Course code is required!' ], },
    credit: { type: Number, required: [ true, 'Credit is required!' ] },
    facultyId: {
      type: Schema.Types.ObjectId,
      required: [ true, 'facultyId is required!' ],
      ref: 'faculty',
    },
    departmentId: {
      type: Schema.Types.ObjectId,
      required: [ true, 'departmentId is required!' ],
      ref: 'department',
    },
    year: { type: String, enum: academicYear, required: true },
    semester: { type: String, enum: academicSemester, required: true },
    type: { type: String, enum: academicType, required: true },
  },
  // { _id: false },
);

const FeeFormSchema = new Schema<IFeeFormRelation>(
  {
    semester: { type: String, enum: academicSemester, required: true },
    year: { type: String, enum: academicYear, required: true },
    studentId: { type: Schema.Types.ObjectId, required: true, ref: 'student' },
    departmentId: { type: Schema.Types.ObjectId, required: true, ref: 'department' },
    departmentalFeeId: { type: Schema.Types.ObjectId, required: true, ref: 'departmental_fee_form' },
    semesterFeeId: { type: Schema.Types.ObjectId, required: true, ref: 'semester_fee_form' },
    residentialFeeId: { type: Schema.Types.ObjectId, ref: 'residential_fee_form' },
    courses: [ courseSchema ],
    examType: { type: String, enum: [ 'Regular', 'Retake', 'Improvement' ], required: true },
    status: { type: String, enum: semesterFeeFormStatus, required: true },
    declineMessage: { type: String },
  },
  { timestamps: true },
);

const FeeForm = model<IFeeFormRelation>('fee_form', FeeFormSchema);
export default FeeForm;
