import { z } from "zod";

const createSchema = z.object({
  form: z.string(),
  to: z.string(),
  fee: z.number().min(0, "Center fee must be greater than or equal to 0"),
  othersFee: z.number().min(0, "Development fee must be greater than or equal to 0"),
});

const updateSchema = z.object({
  form: z.string().optional(),
  to: z.string().optional(),
  fee: z.number().min(0, "Center fee must be greater than or equal to 0").optional(),
  othersFee: z.number().min(0, "Development fee must be greater than or equal to 0").optional(),
});

const residentialFeeFormValidator = { createSchema, updateSchema };

export default residentialFeeFormValidator