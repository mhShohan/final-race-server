import { z } from 'zod';
import { academicSemester, academicType, academicYear } from '../../constants/constants';

const createSchema = z.object({
  title: z.string(),
  code: z.string(),
  credit: z.number(),
  year: z.enum([...academicYear] as [string, ...string[]]),
  semester: z.enum([...academicSemester] as [string, ...string[]]),
  type: z.enum([...academicType] as [string, ...string[]]),
});

const updateSchema = z.object({
  title: z.string().optional(),
  code: z.string().optional(),
  credit: z.number().optional(),
  year: z.enum([...academicYear] as [string, ...string[]]).optional(),
  semester: z.enum([...academicSemester] as [string, ...string[]]).optional(),
  type: z.enum([...academicType] as [string, ...string[]]).optional(),
});

const courseValidator = { createSchema, updateSchema };
export default courseValidator;
