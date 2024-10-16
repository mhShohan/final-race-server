import { Router } from 'express';
import verifyAuth from '../../middlewares/verifyAuth';
import bookController from './book.controllers';
import verifyRole from '../../middlewares/verifyRole';

const bookRoutes = Router();

bookRoutes.use(verifyAuth)

bookRoutes.post('/', verifyRole([ 'DEPARTMENT_OPERATOR' ]), bookController.create);
bookRoutes.get('/', verifyRole([ 'DEPARTMENT_OPERATOR' ]), bookController.getAll);
bookRoutes.get('/student', verifyRole([ 'STUDENT' ]), bookController.getBookOfStudent);
bookRoutes.get('/:id', verifyRole([ 'DEPARTMENT_OPERATOR' ]), bookController.getSingle);
bookRoutes.patch('/:id/provide', verifyRole([ 'DEPARTMENT_OPERATOR' ]), bookController.provideBook);
bookRoutes.patch('/:id/borrowedBack', verifyRole([ 'DEPARTMENT_OPERATOR' ]), bookController.borrowedBack);

export default bookRoutes;
