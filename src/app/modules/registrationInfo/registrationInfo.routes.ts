import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import registrationInfoControllers from './registrationInfo.controllers';
import registrationInfoValidator from './registrationInfo.validators';

const registrationInfoRoutes = Router();

registrationInfoRoutes.post(
  '/',
  validateRequest(registrationInfoValidator.createSchema),
  registrationInfoControllers.create,
);
registrationInfoRoutes.get('/:id', registrationInfoControllers.getSingle);
registrationInfoRoutes.patch(
  '/:id',
  validateRequest(registrationInfoValidator.updateSchema),
  registrationInfoControllers.update,
);

export default registrationInfoRoutes;
