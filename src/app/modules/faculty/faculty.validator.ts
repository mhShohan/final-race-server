import { z } from 'zod';

const facultyValidator = z.object({
  name: z.string(),
});

export default facultyValidator;
