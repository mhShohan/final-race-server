import { z } from "zod";
import { academicSemester, academicYear } from "../../../constants/constants";

const createSemesterFee = z.object({
  year: z.enum(academicYear as [string, ...string[]]),
  semester: z.enum(academicSemester as [string, ...string[]]),
  tuitionFee: z.number().min(0, 'Tuition fee must be a positive number'),
  transport: z.number().min(0, 'Transport fee must be a positive number'),
  library: z.number().min(0, 'Library fee must be a positive number'),
  centralSports: z.number().min(0, 'Central sports fee must be a positive number'),
  studentWelfare: z.number().min(0, 'Student welfare fee must be a positive number'),
  treatment: z.number().min(0, 'Treatment fee must be a positive number'),
  roverScout: z.number().min(0, 'Rover scout fee must be a positive number'),
  BNCC: z.number().min(0, 'BNCC fee must be a positive number'),
  computerFee: z.number().min(0, 'Computer fee must be a positive number'),
  semesterExamFee: z.number().min(0, 'Semester exam fee must be a positive number'),
  admitCard: z.number().min(0, 'Admit card fee must be a positive number'),
  othersFee: z.number().min(0, 'Others fee must be a positive number').optional(),
});

const updateSemesterFee = z.object({
  year: z.enum(academicYear as [string, ...string[]]).optional(),
  semester: z.enum(academicSemester as [string, ...string[]]).optional(),
  tuitionFee: z.number().min(0, 'Tuition fee must be a positive number').optional(),
  transport: z.number().min(0, 'Transport fee must be a positive number').optional(),
  library: z.number().min(0, 'Library fee must be a positive number').optional(),
  centralSports: z.number().min(0, 'Central sports fee must be a positive number').optional(),
  studentWelfare: z.number().min(0, 'Student welfare fee must be a positive number').optional(),
  treatment: z.number().min(0, 'Treatment fee must be a positive number').optional(),
  roverScout: z.number().min(0, 'Rover scout fee must be a positive number').optional(),
  BNCC: z.number().min(0, 'BNCC fee must be a positive number').optional(),
  computerFee: z.number().min(0, 'Computer fee must be a positive number').optional(),
  semesterExamFee: z.number().min(0, 'Semester exam fee must be a positive number').optional(),
  admitCard: z.number().min(0, 'Admit card fee must be a positive number').optional(),
  othersFee: z.number().min(0, 'Others fee must be a positive number').optional(),
});


const semesterFeeFormValidator = {
  createSemesterFee, updateSemesterFee
}

export default semesterFeeFormValidator