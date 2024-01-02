import { z } from "zod"

const createSchema = z.object({
  name: z.string(),
  shortName: z.string(),
  facultyId: z.string(),
})

const updateSchema = z.object({
  name: z.string().optional(),
  shortName: z.string().optional(),
  facultyId: z.string().optional(),
})

const departmentValidator = { createSchema, updateSchema }

export default departmentValidator