import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import courseValidator from './course.validator';
import courseControllers from './course.controller';

const courseRoutes = Router();

courseRoutes.get('/', courseControllers.getAll);
courseRoutes.get('/:id', courseControllers.getSingle);
courseRoutes.post('/', validateRequest(courseValidator.createSchema), courseControllers.create);
courseRoutes.patch('/:id', validateRequest(courseValidator.updateSchema), courseControllers.update);

export default courseRoutes;
