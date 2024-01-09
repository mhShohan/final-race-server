import { Router } from 'express';
import departmentController from './department.controllers';
import validateRequest from '../../middlewares/validateRequest';
import departmentValidator from './department.validator';

const departmentRoutes = Router();

departmentRoutes.get('/', departmentController.getAll);
departmentRoutes.get('/:id', departmentController.getSingle);
departmentRoutes.post(
  '/',
  validateRequest(departmentValidator.createSchema),
  departmentController.create,
);
departmentRoutes.patch(
  '/:id',
  validateRequest(departmentValidator.updateSchema),
  departmentController.update,
);

export default departmentRoutes;
