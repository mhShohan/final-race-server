import { Router } from 'express';
import departmentalFeeFormRoutes from '../modules/FeeForm/departmentalFeeForm/departmentalFeeForm.routes';
import feeFromRoutes from '../modules/FeeForm/feeForm.routes';
import residentialFeeFormRoutes from '../modules/FeeForm/residentialFeeForm/residentialFeeForm.routes';
import semesterFeeRoutes from '../modules/FeeForm/semesterFeeForm/semesterFeeForm.routes';
import adminRoutes from '../modules/admin/admin.routes';
import courseRoutes from '../modules/course/course.routes';
import departmentRoutes from '../modules/department/department.routes';
import facultyRoutes from '../modules/faculty/faculty.routes';
import hallRoutes from '../modules/hall/hall.routes';
import registrationInfoRoutes from '../modules/registrationInfo/registrationInfo.routes';
import studentRoutes from '../modules/student/student.routes';
import paymentRoutes from '../modules/payment/payment.routes';
import bookRoutes from '../modules/book/book.routes';

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
rootRoutes.use('/residential-fee-form', residentialFeeFormRoutes);
rootRoutes.use('/fee-form', feeFromRoutes);
rootRoutes.use('/payments', paymentRoutes);
rootRoutes.use('/books', bookRoutes);

export default rootRoutes;
