import { Router } from 'express';
import adminRoutes from '../modules/admin/admin.routes';
import courseRoutes from '../modules/course/course.routes';
import departmentRoutes from '../modules/department/department.routes';
import facultyRoutes from '../modules/faculty/faculty.routes';
import hallRoutes from '../modules/hall/hall.routes';
import studentRoutes from '../modules/student/student.routes';
import registrationInfoRoutes from '../modules/registrationInfo/registrationInfo.routes';
import semesterFeeRoutes from '../modules/semesterFeeForm/semesterFeeForm.routes';
import departmentalFeeFormRoutes from '../modules/departmentalFeeForm/departmentalFeeForm.routes';

const rootRoutes = Router();

rootRoutes.use('/faculties', facultyRoutes);
rootRoutes.use('/departments', departmentRoutes);
rootRoutes.use('/halls', hallRoutes);
rootRoutes.use('/courses', courseRoutes);
rootRoutes.use('/admins', adminRoutes);
rootRoutes.use('/students', studentRoutes);
rootRoutes.use('/registration-info', registrationInfoRoutes);
rootRoutes.use('/semester-fee-form', semesterFeeRoutes);
rootRoutes.use('/departmental-fee-form', departmentalFeeFormRoutes);

export default rootRoutes;
