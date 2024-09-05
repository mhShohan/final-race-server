import mongoose, { Types } from 'mongoose';
import CustomError from '../../errorHandler/customError';
import STATUS from '../../lib/httpStatus';
import Student from '../student/student.model';
import DepartmentalFeeForm from './departmentalFeeForm/departmentalFeeForm.model';
import { IFeeForm } from './feeForm.interface';
import FeeForm, { IFeeFormRelation } from './feeFrom.model';
import ResidentialFeeForm from './residentialFeeForm/residentialFeeForm.model';
import SemesterFee from './semesterFeeForm/semesterFeeForm.model';
import Admin from '../admin/admin.model';

class FeeFormServices {
  async create(payload: IFeeForm, userId: string) {
    const { year, semester, semesterFee, departmentalFee, examType, courses } = payload;

    const student = await Student.findById(userId);
    if (!student) throw new CustomError(STATUS.NOT_FOUND, 'Student is not found!', 'NOT_FOUND');

    /**
     * Semester Fee Form
     */
    semesterFee.studentId = student._id as Types.ObjectId;
    semesterFee.departmentId = student.departmentId as Types.ObjectId;
    semesterFee.session = student.session as string;
    semesterFee.year = year;
    semesterFee.semester = semester;

    /**
     * Departmental Fee Form
     */
    departmentalFee.studentId = student._id as Types.ObjectId;
    departmentalFee.departmentId = student.departmentId as Types.ObjectId;
    departmentalFee.session = student.session as string;
    departmentalFee.year = year;
    departmentalFee.semester = semester;

    /**
     * Residential Fee Form
     */
    const residentialFee: Record<string, unknown> = {}

    residentialFee.studentId = student._id as Types.ObjectId;
    residentialFee.hallId = student.hallId as Types.ObjectId;
    residentialFee.session = student.session as string;


    /// transaction
    const session = await mongoose.startSession();

    try {
      session.startTransaction();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result: Record<string, any> = {};

      result.departmentalFeeFrom = await DepartmentalFeeForm.create([departmentalFee], { session });
      result.semesterFeeForm = await SemesterFee.create([semesterFee], { session });
      result.residentialFeeForm = await ResidentialFeeForm.create([residentialFee], { session });

      const feeFromPayload: IFeeFormRelation = {
        departmentalFeeId: result.departmentalFeeFrom[0]._id,
        semesterFeeId: result.semesterFeeForm[0]._id,
        residentialFeeId: result.residentialFeeForm[0]._id,
        courses,
        year,
        examType,
        semester,
        studentId: student._id as Types.ObjectId,
        status: 'submitted'
      };


      await FeeForm.create([feeFromPayload], { session });

      await session.commitTransaction();

      return {
        departmentalFeeFrom: result.departmentalFeeFrom[0],
        semesterFeeForm: result.semesterFeeForm[0],
        residentialFeeForm: result.residentialFeeForm[0],
      };
    } catch (error) {
      await session.abortTransaction();
    } finally {
      await session.endSession();
    }
  }

  async readAll(user: { role: string; _id: string }) {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: Record<string, any> = {};
    if (user.role === 'STUDENT') {
      query.studentId = user._id;
    }

    /// if CHAIRMAN then show only submitted forms and only for his department
    if (user.role === 'CHAIRMAN') {
      const admin = await Admin.findById(user._id);
      if (!admin) throw new CustomError(STATUS.NOT_FOUND, 'Admin is not found!', 'NOT_FOUND');

      query.departmentalFeeId.departmentId = admin.departmentId;
      query.status = 'submitted';
    }

    return await FeeForm.find(query)
      .populate('departmentalFeeId')
      .populate('residentialFeeId')
      .populate('semesterFeeId');
  }

  async readOne(id: string) {
    return await FeeForm.findById(id)
      .populate('departmentalFeeId')
      .populate('residentialFeeId')
      .populate('semesterFeeId');
  }
}

const feeFormServices = new FeeFormServices();
export default feeFormServices;
