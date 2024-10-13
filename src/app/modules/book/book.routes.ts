import { Router } from 'express';
import verifyAuth from '../../middlewares/verifyAuth';
import bookController from './book.controllers';
import verifyRole from '../../middlewares/verifyRole';

const bookRoutes = Router();

bookRoutes.use(verifyAuth)

bookRoutes.post('/', verifyRole([ 'DEPARTMENT_OPERATOR' ]), bookController.create);
bookRoutes.get('/', verifyRole([ 'DEPARTMENT_OPERATOR' ]), bookController.getAll);
bookRoutes.get('/:id', verifyRole([ 'DEPARTMENT_OPERATOR' ]), bookController.getSingle);


export default bookRoutes;
