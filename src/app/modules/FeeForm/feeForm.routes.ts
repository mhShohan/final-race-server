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
  verifyRole([ 'CHAIRMAN', 'DEPARTMENT_OPERATOR' ]),
  feeFormControllers.getAllByChairman,
);

feeFromRoutes.get(
  '/by-hall',
  verifyRole([ 'HALL_OPERATOR' ]),
  feeFormControllers.getAllByHall,
);

feeFromRoutes.get(
  '/by-hall/payment',
  verifyRole([ 'HALL_OPERATOR' ]),
  feeFormControllers.getAllHallPayments,
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

feeFromRoutes.patch(
  '/accept-all',
  feeFormControllers.acceptAll,
);

export default feeFromRoutes;
