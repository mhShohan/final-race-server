import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import semesterFeeFormValidator from './semesterFeeForm.validator';
import semesterFeeControllers from './semesterFeeForm.controllers';
import verifyAuth from '../../middlewares/verifyAuth';
import verifyRole from '../../middlewares/verifyRole';

const semesterFeeRoutes = Router();

semesterFeeRoutes.post(
  '/',
  verifyAuth,
  verifyRole(['STUDENT']),
  validateRequest(semesterFeeFormValidator.createSemesterFee),
  semesterFeeControllers.create,
);

semesterFeeRoutes.get(
  '/:id',
  verifyAuth,
  verifyRole(['STUDENT', 'SUPER_ADMIN', 'ADMIN']),
  semesterFeeControllers.getSingle);

semesterFeeRoutes.get(
  '/',
  verifyAuth,
  verifyRole(['STUDENT', 'SUPER_ADMIN', 'ADMIN']),
  semesterFeeControllers.getAll);

semesterFeeRoutes.patch(
  '/:id',
  verifyAuth,
  verifyRole(['STUDENT', 'SUPER_ADMIN', 'ADMIN']),
  validateRequest(semesterFeeFormValidator.updateSemesterFee),
  semesterFeeControllers.update,
);

export default semesterFeeRoutes;
