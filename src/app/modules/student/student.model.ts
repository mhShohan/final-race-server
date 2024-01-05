import { Schema, model } from 'mongoose';
import { IStudent, IEducationalQualification, IAddress } from './student.interfaces';
import { studentStatus } from '../../constants/constants';

// Mongoose schema for IEducationalQualification
const educationalQualificationSchema = new Schema<IEducationalQualification>({
  name: { type: String, required: true },
  passingYear: { type: String, required: true },
  institute: { type: String, required: true },
  board: { type: String, required: true },
  roll: { type: String, required: true },
  GPA: { type: Number, required: true },
});

// Mongoose schema for IAddress
const addressSchema = new Schema<IAddress>({
  village: { type: String, required: true },
  subDistrict: { type: String, required: true },
  postOffice: { type: String, required: true },
  district: { type: String, required: true },
  zipCode: { type: String, required: true },
});

// Mongoose schema for IStudent
const studentSchema = new Schema<IStudent>({
  studentId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: 0 },
  dateOfBirth: { type: String, required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  avatar: { type: String, required: true },
  session: { type: String, required: true },
  phone: { type: String, required: true },
  facultyId: { type: Schema.Types.ObjectId, required: true, ref: 'faculty' },
  departmentId: { type: Schema.Types.ObjectId, required: true, ref: 'department' },
  residentialHall: { type: Schema.Types.ObjectId, required: true, ref: 'hall' },
  educationalQualifications: { type: [educationalQualificationSchema], required: true },
  presentAddress: { type: addressSchema, required: true },
  permanentAddress: { type: addressSchema, required: true },
  nationality: { type: String, required: true },
  religion: { type: String, required: true },
  status: { type: String, enum: studentStatus, default: 'PENDING' },
  isVerified: { type: Boolean, default: false },
});

// Create the Mongoose model
const Student = model<IStudent>('student', studentSchema);

export default Student;
