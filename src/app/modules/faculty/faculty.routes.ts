import { Router } from 'express';
import facultyValidator from './faculty.validator';
import facultyController from './faculty.controller';
import validateRequest from '../../middlewares/validateRequest';

const facultyRoutes = Router();

facultyRoutes.get('/', facultyController.getAll);
facultyRoutes.get('/:id', facultyController.getSingle);
facultyRoutes.post('/', validateRequest(facultyValidator), facultyController.create);
facultyRoutes.patch('/:id', validateRequest(facultyValidator), facultyController.update);

export default facultyRoutes;
