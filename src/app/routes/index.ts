import { Router } from 'express';
import facultyRoutes from '../modules/faculty/faculty.routes';

const rootRoutes = Router();

rootRoutes.use('/faculties', facultyRoutes);

export default rootRoutes;
