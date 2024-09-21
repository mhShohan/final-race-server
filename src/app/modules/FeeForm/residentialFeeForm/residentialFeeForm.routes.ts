import { Router } from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import verifyAuth from '../../../middlewares/verifyAuth';
import verifyRole from '../../../middlewares/verifyRole';
import residentialFeeFormValidator from './residentialFeeForm.validator';
import residentialFeeFormControllers from './residentialFeeForm.controllers';

const residentialFeeFormRoutes = Router();

residentialFeeFormRoutes.use(verifyAuth);

residentialFeeFormRoutes.post(
  '/',
  verifyRole(['STUDENT']),
  validateRequest(residentialFeeFormValidator.createSchema),
  residentialFeeFormControllers.create,
);

residentialFeeFormRoutes.get(
  '/:id',
  verifyRole(['STUDENT', 'SUPER_ADMIN', 'ADMIN']),
  residentialFeeFormControllers.getSingle,
);

residentialFeeFormRoutes.get(
  '/',
  verifyRole(['STUDENT', 'SUPER_ADMIN', 'ADMIN']),
  residentialFeeFormControllers.getAll,
);

residentialFeeFormRoutes.patch(
  '/:id',
  // verifyRole(['STUDENT', 'SUPER_ADMIN', 'ADMIN']),
  // validateRequest(residentialFeeFormValidator.updateSchema),
  residentialFeeFormControllers.update,
);

export default residentialFeeFormRoutes;
