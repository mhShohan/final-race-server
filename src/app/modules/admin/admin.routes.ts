import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import adminControllers from './admin.controller';
import adminValidator from './admin.validator';

const adminRoutes = Router();

adminRoutes.get('/', adminControllers.getAll);
adminRoutes.get('/:id', adminControllers.getSingle);
adminRoutes.post('/', validateRequest(adminValidator.createSchema), adminControllers.create);
adminRoutes.patch('/:id', validateRequest(adminValidator.updateSchema), adminControllers.update);

export default adminRoutes;
