import { Router } from 'express';
import verifyAuth from '../../middlewares/verifyAuth';
import validateRequest from '../../middlewares/validateRequest';
import verifyRole from '../../middlewares/verifyRole';
import feeFormValidator from './feeForm.validator';
import feeFormControllers from './feeForm.controllers';

const feeFromRoutes = Router();

feeFromRoutes.use(verifyAuth);

feeFromRoutes.get(
  '/check',
  verifyRole([ 'STUDENT' ]),
  feeFormControllers.checkExistence,
);

feeFromRoutes.post(
  '/',
  verifyRole([ 'STUDENT' ]),
  validateRequest(feeFormValidator.createSchema),
  feeFormControllers.create,
);

feeFromRoutes.get(
  '/',
  verifyRole([ 'STUDENT', 'CHAIRMAN', 'ADMIN', 'HALL_OPERATOR', 'DEPARTMENT_OPERATOR' ]),
  feeFormControllers.getAll,
);

feeFromRoutes.get(
  '/by-chairman',
  verifyRole([ 'CHAIRMAN' ]),
  feeFormControllers.getAllByChairman,
);

feeFromRoutes.get(
  '/by-hall',
  verifyRole([ 'HALL_OPERATOR' ]),
  feeFormControllers.getAllByHall,
);

feeFromRoutes.get(
  '/exam-controller',
  verifyRole([ 'ADMIN', ]),
  feeFormControllers.getAllByExamController,
);

feeFromRoutes.patch(
  '/status-update/:id',
  feeFormControllers.updateAndAccept,
);

feeFromRoutes.get(
  '/:id',
  verifyRole([ 'STUDENT', 'CHAIRMAN', 'ADMIN', 'HALL_OPERATOR', 'DEPARTMENT_OPERATOR' ]),
  feeFormControllers.getSingle,
);

export default feeFromRoutes;
