import { Router } from 'express';
import verifyAuth from '../../middlewares/verifyAuth';
import validateRequest from '../../middlewares/validateRequest';
import verifyRole from '../../middlewares/verifyRole';
import feeFormValidator from './feeForm.validator';
import feeFormControllers from './feeForm.controllers';

const feeFromRoutes = Router();

feeFromRoutes.use(verifyAuth);

feeFromRoutes.post(
  '/',
  verifyRole(['STUDENT']),
  validateRequest(feeFormValidator.createSchema),
  feeFormControllers.create,
);

feeFromRoutes.get(
  '/',
  verifyRole(['STUDENT', 'CHAIRMAN', 'HALL_OPERATOR', 'DEPARTMENT_OPERATOR']),
  feeFormControllers.getAll,
);
feeFromRoutes.get(
  '/:id',
  verifyRole(['STUDENT', 'CHAIRMAN', 'HALL_OPERATOR', 'DEPARTMENT_OPERATOR']),
  feeFormControllers.getAll,
);

export default feeFromRoutes;
