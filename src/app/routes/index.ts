import { Router } from 'express';
import facultyRoutes from '../modules/faculty/faculty.routes';
import departmentRoutes from '../modules/department/department.routes';
import hallRoutes from '../modules/hall/hall.routes';

const rootRoutes = Router();

rootRoutes.use('/faculties', facultyRoutes);
rootRoutes.use('/departments', departmentRoutes);
rootRoutes.use('/halls', hallRoutes);

export default rootRoutes;
