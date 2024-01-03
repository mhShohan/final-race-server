import { z } from 'zod';

const hallValidator = z.object({
  name: z.string(),
});

export default hallValidator;
