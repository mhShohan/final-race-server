import { Router } from 'express';
import facultyRoutes from '../modules/faculty/faculty.routes';
import departmentRoutes from '../modules/department/department.routes';

const rootRoutes = Router();

rootRoutes.use('/faculties', facultyRoutes);
rootRoutes.use('/departments', departmentRoutes);

export default rootRoutes;
