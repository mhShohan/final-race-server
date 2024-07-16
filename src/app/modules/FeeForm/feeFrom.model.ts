import { Types, model, Schema } from 'mongoose';
import DepartmentalFeeForm from './departmentalFeeForm/departmentalFeeForm.model';
import SemesterFee from './semesterFeeForm/semesterFeeForm.model';
import ResidentialFeeForm from './residentialFeeForm/residentialFeeForm.model';
import { academicSemester, academicType, academicYear } from '../../constants/constants';
import { ICourse } from '../course/course.interface';

export interface IFeeFormRelation {
  departmentalFeeId: Types.ObjectId;
  semesterFeeId: Types.ObjectId;
  residentialFeeId?: Types.ObjectId;
  courses: ICourse[];
}

const courseSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true, },
  title: { type: String, required: [true, 'Course title is required!'], unique: true, },
  code: { type: String, required: [true, 'Course code is required!'], unique: true },
  credit: { type: Number, required: [true, 'Credit is required!'] },
  facultyId: { type: Schema.Types.ObjectId, required: [true, 'facultyId is required!'], ref: 'faculty', },
  departmentId: { type: Schema.Types.ObjectId, required: [true, 'departmentId is required!'], ref: 'department' },
  year: { type: String, enum: academicYear, required: true },
  semester: { type: String, enum: academicSemester, required: true },
  type: { type: String, enum: academicType, required: true },
}, { _id: false });


const FeeFormSchema = new Schema<IFeeFormRelation>(
  {
    departmentalFeeId: { type: Schema.Types.ObjectId, required: true, ref: DepartmentalFeeForm },
    semesterFeeId: { type: Schema.Types.ObjectId, required: true, ref: SemesterFee },
    residentialFeeId: { type: Schema.Types.ObjectId, ref: ResidentialFeeForm },
    courses: [courseSchema],
  },
  { timestamps: true },
);

const FeeForm = model<IFeeFormRelation>('fee_form', FeeFormSchema);
export default FeeForm;
