import { Router } from 'express';
import adminRoutes from '../modules/admin/admin.routes';
import courseRoutes from '../modules/course/course.routes';
import departmentRoutes from '../modules/department/department.routes';
import facultyRoutes from '../modules/faculty/faculty.routes';
import hallRoutes from '../modules/hall/hall.routes';
import studentRoutes from '../modules/student/student.routes';
import registrationInfoRoutes from '../modules/registrationInfo/registrationInfo.routes';

const rootRoutes = Router();

rootRoutes.use('/faculties', facultyRoutes);
rootRoutes.use('/departments', departmentRoutes);
rootRoutes.use('/halls', hallRoutes);
rootRoutes.use('/courses', courseRoutes);
rootRoutes.use('/admins', adminRoutes);
rootRoutes.use('/students', studentRoutes);
rootRoutes.use('/registration-info', registrationInfoRoutes);

export default rootRoutes;
