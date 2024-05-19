import { Router } from 'express';
import semesterFeeFormValidator from './semesterFeeForm.validator';
import semesterFeeControllers from './semesterFeeForm.controllers';
import verifyAuth from '../../../middlewares/verifyAuth';
import verifyRole from '../../../middlewares/verifyRole';
import validateRequest from '../../../middlewares/validateRequest';

const semesterFeeRoutes = Router();

semesterFeeRoutes.use(verifyAuth);

semesterFeeRoutes.post(
  '/',
  verifyRole(['STUDENT']),
  validateRequest(semesterFeeFormValidator.createSemesterFee),
  semesterFeeControllers.create,
);

semesterFeeRoutes.get(
  '/:id',
  verifyRole(['STUDENT', 'SUPER_ADMIN', 'ADMIN']),
  semesterFeeControllers.getSingle,
);

semesterFeeRoutes.get(
  '/',
  verifyRole(['STUDENT', 'SUPER_ADMIN', 'ADMIN']),
  semesterFeeControllers.getAll,
);

semesterFeeRoutes.patch(
  '/:id',
  verifyRole(['STUDENT', 'SUPER_ADMIN', 'ADMIN']),
  validateRequest(semesterFeeFormValidator.updateSemesterFee),
  semesterFeeControllers.update,
);

export default semesterFeeRoutes;
