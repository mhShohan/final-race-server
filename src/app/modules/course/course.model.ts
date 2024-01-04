import { Schema, model } from 'mongoose';
import { ICourse } from './course.interface';
import { academicSemester, academicType, academicYear } from '../../constants/constants';

const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: [true, 'Course title is required!'],
      unique: true
    },
    code: {
      type: String,
      required: [true, 'Course code is required!'],
      unique: true
    },
    credit: {
      type: Number,
      required: [true, 'Credit is required!'],
    },
    facultyId: {
      type: Schema.Types.ObjectId,
      required: [true, 'facultyId is required!'],
      ref: 'faculty'
    },
    departmentId: {
      type: Schema.Types.ObjectId,
      required: [true, 'departmentId is required!'],
      ref: 'department'
    },
    year: {
      type: String,
      enum: academicYear,
      required: true
    },
    semester: {
      type: String,
      enum: academicSemester,
      required: true
    },
    type: {
      type: String,
      enum: academicType,
      required: true
    }
  },
  { timestamps: true },
);

const Course = model<ICourse>('course', courseSchema);

export default Course;
