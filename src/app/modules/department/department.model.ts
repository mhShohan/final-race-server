import { Schema, model } from "mongoose";
import { IDepartment } from "./department.interface";

const departmentSchema = new Schema<IDepartment>({
  name: {
    type: String,
    unique: true,
    required: [true, 'Department name is required!'],
  },
  shortName: {
    type: String,
    unique: true,
    required: [true, 'Department shortName is required!'],
  },
  facultyId: {
    type: Schema.Types.ObjectId,
    required: [true, 'facultyId is required!'],
    ref: 'faculty'
  },
}, { timestamps: true })

const Department = model<IDepartment>('department', departmentSchema)

export default Department