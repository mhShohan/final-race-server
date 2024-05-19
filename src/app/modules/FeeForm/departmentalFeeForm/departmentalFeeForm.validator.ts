import { z } from 'zod';
import { academicSemester, academicYear } from '../../../constants/constants';

const createSchema = z.object({
  year: z.enum(academicYear as [string, ...string[]]),
  semester: z.enum(academicSemester as [string, ...string[]]),
  centerFee: z.number().min(0, 'Center fee must be greater than or equal to 0'),
  association: z.number().min(0, 'Association must be greater than or equal to 0'),
  developmentFee: z.number().min(0, 'Development fee must be greater than or equal to 0'),
  amercementFee: z.number().min(0, 'Amercement fee must be greater than or equal to 0').optional(),
});

const updateSchema = z.object({
  year: z.enum(academicYear as [string, ...string[]]).optional(),
  semester: z.enum(academicSemester as [string, ...string[]]).optional(),
  centerFee: z.number().min(0, 'Center fee must be greater than or equal to 0').optional(),
  association: z.number().min(0, 'Association must be greater than or equal to 0').optional(),
  developmentFee: z
    .number()
    .min(0, 'Development fee must be greater than or equal to 0')
    .optional(),
  amercementFee: z.number().min(0, 'Amercement fee must be greater than or equal to 0').optional(),
});

const departmentalFeeFormValidator = { createSchema, updateSchema };

export default departmentalFeeFormValidator;
