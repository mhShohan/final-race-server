import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import hallController from './hall.controller';
import hallValidator from './hall.validator';

const hallRoutes = Router();

hallRoutes.get('/', hallController.getAll);
hallRoutes.get('/:id', hallController.getSingle);
hallRoutes.post('/', validateRequest(hallValidator), hallController.create);
hallRoutes.patch('/:id', validateRequest(hallValidator), hallController.update);

export default hallRoutes;
