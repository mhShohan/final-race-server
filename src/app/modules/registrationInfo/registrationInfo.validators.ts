import { z } from "zod";

const createSchema = z.object({
  tuitionFee: z.number().min(0, { message: "Tuition Fee must be greater than 0" }),
  transport: z.number().min(0, { message: "Transport must be greater than or equal to 0" }),
  library: z.number().min(0, { message: "Library must be greater than or equal to 0" }),
  centralSports: z.number().min(0, { message: "Central Sports must be greater than or equal to 0" }),
  studentWelfare: z.number().min(0, { message: "Student Welfare must be greater than or equal to 0" }),
  treatment: z.number().min(0, { message: "Treatment must be greater than or equal to 0" }),
  roverScout: z.number().min(0, { message: "Rover Scout must be greater than or equal to 0" }),
  BNCC: z.number().min(0, { message: "BNCC must be greater than or equal to 0" }),
  computerFee: z.number().min(0, { message: "Computer Fee must be greater than or equal to 0" }),
  semesterExamFee: z.number().min(0, { message: "Semester Exam Fee must be greater than or equal to 0" }),
  admitCard: z.number().min(0, { message: "Admit Card must be greater than or equal to 0" }),
  othersFee: z.number().min(0, { message: "Others Fee must be greater than or equal to 0" }),
});

const updateSchema = z.object({
  tuitionFee: z.number().min(0, { message: "Tuition Fee must be greater than 0" }).optional(),
  transport: z.number().min(0, { message: "Transport must be greater than or equal to 0" }).optional(),
  library: z.number().min(0, { message: "Library must be greater than or equal to 0" }).optional(),
  centralSports: z.number().min(0, { message: "Central Sports must be greater than or equal to 0" }).optional(),
  studentWelfare: z.number().min(0, { message: "Student Welfare must be greater than or equal to 0" }).optional(),
  treatment: z.number().min(0, { message: "Treatment must be greater than or equal to 0" }).optional(),
  roverScout: z.number().min(0, { message: "Rover Scout must be greater than or equal to 0" }).optional(),
  BNCC: z.number().min(0, { message: "BNCC must be greater than or equal to 0" }).optional(),
  computerFee: z.number().min(0, { message: "Computer Fee must be greater than or equal to 0" }).optional(),
  semesterExamFee: z.number().min(0, { message: "Semester Exam Fee must be greater than or equal to 0" }).optional(),
  admitCard: z.number().min(0, { message: "Admit Card must be greater than or equal to 0" }).optional(),
  othersFee: z.number().min(0, { message: "Others Fee must be greater than or equal to 0" }).optional(),
});


const registrationInfoValidator = { createSchema, updateSchema }
export default registrationInfoValidator