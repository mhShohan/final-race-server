import { z } from 'zod';
import { academicSemester, academicYear } from '../../constants/constants';

const createSchema = z.object({
  year: z.enum(academicYear as [string, ...string[]]),
  semester: z.enum(academicSemester as [string, ...string[]]),
  departmentalFee: z.object({
    centerFee: z.number().min(0, 'Center fee must be greater than or equal to 0'),
    association: z.number().min(0, 'Association must be greater than or equal to 0'),
    developmentFee: z.number().min(0, 'Development fee must be greater than or equal to 0'),
    amercementFee: z
      .number()
      .min(0, 'Amercement fee must be greater than or equal to 0')
      .optional(),
  }),
  semesterFee: z.object({
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
  }),
  courses: z.array(z.object({})),
  residentialFee: z
    .object({
      from: z.string(),
      to: z.string(),
      fee: z.number().min(0, 'Center fee must be greater than or equal to 0'),
      othersFee: z.number().min(0, 'Development fee must be greater than or equal to 0').optional(),
    })
    .optional(),
  studentId: z.string({ required_error: 'Student id is required!' }),
});

const feeFormValidator = { createSchema };
export default feeFormValidator;
