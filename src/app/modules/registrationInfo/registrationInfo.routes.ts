import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import registrationInfoControllers from './registrationInfo.controllers';
import registrationInfoValidator from './registrationInfo.validators';
import verifyAuth from '../../middlewares/verifyAuth';
import verifyRole from '../../middlewares/verifyRole';
import { adminRoleConstant } from '../../constants/adminRoleConstant';

const registrationInfoRoutes = Router();

registrationInfoRoutes.use(verifyAuth)

registrationInfoRoutes.post(
  '/',
  validateRequest(registrationInfoValidator.createSchema),
  registrationInfoControllers.create,
);

registrationInfoRoutes.get(
  '/',
  verifyRole([adminRoleConstant.CHAIRMAN, adminRoleConstant.DEPARTMENT_OPERATOR]),
  registrationInfoControllers.getSingle
);

registrationInfoRoutes.get(
  '/status',
  verifyRole([adminRoleConstant.CHAIRMAN, adminRoleConstant.DEPARTMENT_OPERATOR]),
  registrationInfoControllers.checkStatus
);

registrationInfoRoutes.patch(
  '/:id',
  validateRequest(registrationInfoValidator.updateSchema),
  registrationInfoControllers.update,
);

export default registrationInfoRoutes;
