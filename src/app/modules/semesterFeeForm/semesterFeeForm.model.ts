import { Schema, model } from "mongoose";
import { ISemesterFeeForm } from "./semesterFeeForm.interfaces";
import { academicSemester, academicYear } from "../../constants/constants";

const SemesterFeeSchema = new Schema<ISemesterFeeForm>({
  departmentId: { type: Schema.Types.ObjectId, required: true },
  studentId: { type: Schema.Types.ObjectId, required: true },
  year: { type: String, required: true, enum: academicYear },
  semester: { type: String, required: true, enum: academicSemester },
  tuitionFee: { type: Number, required: true },
  transport: { type: Number, required: true },
  library: { type: Number, required: true },
  centralSports: { type: Number, required: true },
  studentWelfare: { type: Number, required: true },
  treatment: { type: Number, required: true },
  roverScout: { type: Number, required: true },
  BNCC: { type: Number, required: true },
  computerFee: { type: Number, required: true },
  semesterExamFee: { type: Number, required: true },
  admitCard: { type: Number, required: true },
  othersFee: { type: Number },
}, { timestamps: true });

const SemesterFee = model<ISemesterFeeForm>('Semester-Fee', SemesterFeeSchema);
export default SemesterFee;