import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import studentValidator from './student.validator';
import studentControllers from './student.controllers';
import verifyAuth from '../../middlewares/verifyAuth';

const studentRoutes = Router();

studentRoutes.get('/', studentControllers.getAll);
studentRoutes.get('/self', verifyAuth, studentControllers.getSelf);
studentRoutes.get('/:id', studentControllers.getSingle);

studentRoutes.post('/verify', verifyAuth, studentControllers.verifyAccountRequest);

studentRoutes.post(
  '/register',
  validateRequest(studentValidator.registerSchema),
  studentControllers.create,
);

studentRoutes.post(
  '/login',
  validateRequest(studentValidator.loginSchema),
  studentControllers.login,
);

studentRoutes.patch(
  '/:id',
  validateRequest(studentValidator.updateSchema),
  studentControllers.update,
);

export default studentRoutes;
