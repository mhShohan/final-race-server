import { z } from 'zod';
import { studentStatus } from '../../constants/constants';

const educationalQualificationSchema = z.object({
  name: z.string(),
  passingYear: z.number(),
  institute: z.string(),
  board: z.string(),
  roll: z.string(),
  GPA: z.number(),
});

const addressSchema = z.object({
  village: z.string(),
  subDistrict: z.string(),
  postOffice: z.string(),
  district: z.string(),
  zipCode: z.string(),
});

export const createStudentSchema = z.object({
  studentId: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  dateOfBirth: z.date(),
  fatherName: z.string(),
  motherName: z.string(),
  avatar: z.string(),
  session: z.string(),
  phone: z.string(),
  facultyId: z.string(),
  departmentId: z.string(),
  residentialHall: z.string(),
  educationalQualifications: z.array(educationalQualificationSchema),
  presentAddress: addressSchema,
  permanentAddress: addressSchema,
  nationality: z.string(),
  religion: z.string(),
  status: z.enum([...studentStatus] as [string, ...string[]]),
  isVerified: z.boolean(),
});


const studentValidator = { createStudentSchema }

export default studentValidator