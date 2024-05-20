import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import adminControllers from './admin.controller';
import adminValidator from './admin.validator';
import verifyAuth from '../../middlewares/verifyAuth';

const adminRoutes = Router();

adminRoutes.get('/', adminControllers.getAll);
adminRoutes.get('/all-students', verifyAuth, adminControllers.allStudents);
adminRoutes.get('/review-request', verifyAuth, adminControllers.reviewRequest);
adminRoutes.patch('/review-request/:id', verifyAuth, validateRequest(adminValidator.verifyStudentRequestSchema), adminControllers.verifyStudentRequest);

adminRoutes.get('/:id', adminControllers.getSingle);
adminRoutes.post('/', validateRequest(adminValidator.createSchema), adminControllers.create);
adminRoutes.post('/login', validateRequest(adminValidator.loginSchema), adminControllers.login);
adminRoutes.patch('/:id', validateRequest(adminValidator.updateSchema), adminControllers.update);


export default adminRoutes;
