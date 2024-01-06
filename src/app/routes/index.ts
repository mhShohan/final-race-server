import { Router } from 'express';
import facultyRoutes from '../modules/faculty/faculty.routes';
import departmentRoutes from '../modules/department/department.routes';
import hallRoutes from '../modules/hall/hall.routes';
import courseRoutes from '../modules/course/course.routes';
import adminRoutes from '../modules/admin/admin.routes';
import studentRoutes from '../modules/student/student.routes';

const rootRoutes = Router();

rootRoutes.use('/faculties', facultyRoutes);
rootRoutes.use('/departments', departmentRoutes);
rootRoutes.use('/halls', hallRoutes);
rootRoutes.use('/courses', courseRoutes);
rootRoutes.use('/admins', adminRoutes);
rootRoutes.use('/students', studentRoutes);

export default rootRoutes;
