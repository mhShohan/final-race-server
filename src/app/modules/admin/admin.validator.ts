import { z } from 'zod';
import { adminRole } from '../../constants/constants';

const createSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6, { message: 'Password must be contain atleast 6 characters!' }).max(20, { message: 'Password must be less than 20 characters!' }),
  departmentId: z.string().optional(),
  hallId: z.string().optional(),
  role: z.enum([...adminRole] as [string, ...string[]])
});

const updateSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(6, { message: 'Password must be contain atleast 6 characters!' }).max(20, { message: 'Password must be less than 20 characters!' }).optional(),
  departmentId: z.string().optional(),
  hallId: z.string().optional(),
  role: z.enum([...adminRole] as [string, ...string[]])
});

const adminValidator = { createSchema, updateSchema }
export default adminValidator;
