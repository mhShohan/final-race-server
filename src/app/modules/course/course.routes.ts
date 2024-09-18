import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import courseValidator from './course.validator';
import courseControllers from './course.controller';
import verifyAuth from '../../middlewares/verifyAuth';
import verifyRole from '../../middlewares/verifyRole';
import { adminRoleConstant } from '../../constants/adminRoleConstant';

const courseRoutes = Router();

courseRoutes.use(verifyAuth);

courseRoutes.get(
  '/',
  verifyRole([
    adminRoleConstant.SUPER_ADMIN,
    adminRoleConstant.ADMIN,
    adminRoleConstant.DEPARTMENT_OPERATOR,
    adminRoleConstant.STUDENT,
    adminRoleConstant.CHAIRMAN,
  ]),
  courseControllers.getAll,
);
courseRoutes.get('/:id', courseControllers.getSingle);
courseRoutes.post(
  '/',
  verifyRole([adminRoleConstant.DEPARTMENT_OPERATOR]),
  validateRequest(courseValidator.createSchema),
  courseControllers.create,
);
courseRoutes.patch(
  '/:id',
  verifyRole([adminRoleConstant.DEPARTMENT_OPERATOR]),
  validateRequest(courseValidator.updateSchema),
  courseControllers.update,
);

export default courseRoutes;
