import { Router } from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import verifyAuth from '../../../middlewares/verifyAuth';
import verifyRole from '../../../middlewares/verifyRole';
import departmentalFeeFormValidator from './departmentalFeeForm.validator';
import departmentalFeeFormControllers from './departmentalFeeForm.controllers';

const departmentalFeeFormRoutes = Router();

departmentalFeeFormRoutes.use(verifyAuth);

departmentalFeeFormRoutes.post(
  '/',
  verifyRole(['STUDENT']),
  validateRequest(departmentalFeeFormValidator.createSchema),
  departmentalFeeFormControllers.create,
);

departmentalFeeFormRoutes.get(
  '/:id',
  verifyRole(['STUDENT', 'SUPER_ADMIN', 'ADMIN']),
  departmentalFeeFormControllers.getSingle,
);

departmentalFeeFormRoutes.get(
  '/',
  verifyRole(['STUDENT', 'SUPER_ADMIN', 'ADMIN']),
  departmentalFeeFormControllers.getAll,
);

departmentalFeeFormRoutes.patch(
  '/:id',
  verifyRole(['STUDENT', 'SUPER_ADMIN', 'ADMIN']),
  validateRequest(departmentalFeeFormValidator.updateSchema),
  departmentalFeeFormControllers.update,
);

export default departmentalFeeFormRoutes;
