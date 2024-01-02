import { Router } from 'express';
import facultyValidator from './faculty.validator';
import facultyController from './faculty.controller';
import validateRequest from '../../middlewares/validateRequest';

const facultyRoutes = Router();

facultyRoutes.get('/', facultyController.getAllFaculties);
facultyRoutes.get('/:id', facultyController.getSingleFaculty);
facultyRoutes.post('/', validateRequest(facultyValidator), facultyController.createFaculty);
facultyRoutes.patch('/:id', validateRequest(facultyValidator), facultyController.updateFaculty);

export default facultyRoutes;
