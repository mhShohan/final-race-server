/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { semesterFeeFormStatus } from '../../constants/constants';

class FeeFormServices {

  async checkExistence(userId: string, queryParams: Record<string, unknown>) {

    const query: Record<string, unknown> = {
      studentId: userId, ...queryParams
    }

    if (query.examType !== 'Regular') return

    const form = await FeeForm.findOne(query);
    if (form) throw new CustomError(STATUS.CONFLICT, 'Form already exists!', 'CONFLICT');

    return
  }

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

      result.departmentalFeeFrom = await DepartmentalFeeForm.create([ departmentalFee ], { session });
      result.semesterFeeForm = await SemesterFee.create([ semesterFee ], { session });
      result.residentialFeeForm = await ResidentialFeeForm.create([ residentialFee ], { session });

      const feeFromPayload: IFeeFormRelation = {
        departmentId: student.departmentId!,
        departmentalFeeId: result.departmentalFeeFrom[ 0 ]._id,
        semesterFeeId: result.semesterFeeForm[ 0 ]._id,
        residentialFeeId: result.residentialFeeForm[ 0 ]._id,
        courses,
        year,
        examType,
        semester,
        studentId: student._id as Types.ObjectId,
        status: 'submitted'
      };


      await FeeForm.create([ feeFromPayload ], { session });

      await session.commitTransaction();

      return {
        departmentalFeeFrom: result.departmentalFeeFrom[ 0 ],
        semesterFeeForm: result.semesterFeeForm[ 0 ],
        residentialFeeForm: result.residentialFeeForm[ 0 ],
      };
    } catch (error) {
      await session.abortTransaction();
    } finally {
      await session.endSession();
    }
  }

  async readAll(user: { role: string; _id: string }, queryParams: Record<string, unknown>) {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: Record<string, any> = {};
    if (user.role === 'STUDENT') {
      query.studentId = user._id;
      if (!queryParams.status) {
        query.status = { $ne: "approved_by_exam_controller" }
      }
    }

    if (queryParams.status && semesterFeeFormStatus.includes(queryParams.status as string)) {
      query.status = queryParams.status
    }


    return await FeeForm.find(query)
      .populate('departmentalFeeId')
      .populate('residentialFeeId')
      .populate('semesterFeeId');
  }

  async getAllByChairman(userId: string, queryParams: Record<string, unknown>) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let status: any = 'submitted';
    const chairman = await Admin.findById(userId)
    if (!chairman) throw new CustomError(STATUS.NOT_FOUND, 'Chairman is not found!', 'NOT_FOUND');

    if (queryParams.status === 'true') {
      status = {
        $in: [ 'approved_by_chairman',
          'rejected_by_chairman',
          'approved_by_hall_authority',
          'rejected_by_hall_authority',
          'approved_by_bank_accountant',
          'rejected_by_bank_accountant',
          'payment_completed',
          'approved_by_exam_controller',
          'rejected_by_exam_controller', ]
      }
    }

    const query: Record<string, unknown> = {
      departmentId: chairman?.departmentId, status
    }

    if (queryParams.search) {
      const student = await Student.findOne({ studentId: queryParams.search })
      if (student) {
        query.studentId = student._id
      } else {
        query.studentId = null
      }
    }

    const forms = await FeeForm.find(query).populate('studentId').populate('departmentalFeeId')
      .populate('residentialFeeId')
      .populate('semesterFeeId');

    return forms
  }

  async getAllByExamController(queryParams: Record<string, unknown>) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let status: any = 'payment_completed';

    if (queryParams.status === 'true') {
      status = {
        $in: [
          'payment_completed',
          'approved_by_exam_controller',
          'rejected_by_exam_controller', ]
      }
    }

    const query: Record<string, unknown> = {
      status
    }


    if (queryParams.search) {
      const student = await Student.findOne({ studentId: queryParams.search })
      if (student) {
        query.studentId = student._id
      } else {
        query.studentId = null
      }
    }

    const forms = await FeeForm.find(query).populate('studentId').populate('departmentalFeeId')
      .populate('residentialFeeId')
      .populate('semesterFeeId');

    return forms
  }


  async getAllByHall(userId: string, queryParams: Record<string, unknown>) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let status: any = 'approved_by_chairman';
    const hallOperator = await Admin.findById(userId)
    if (!hallOperator) throw new CustomError(STATUS.NOT_FOUND, 'hallOperator is not found!', 'NOT_FOUND');

    if (queryParams.status === 'true') {
      status = {
        $in: [
          'approved_by_chairman',
          'rejected_by_chairman',
          'approved_by_hall_authority',
          'rejected_by_hall_authority',
          'approved_by_bank_accountant',
          'rejected_by_bank_accountant',
          'payment_completed',
          'approved_by_exam_controller',
          'rejected_by_exam_controller'
        ]
      }
    }

    const query: Record<string, unknown> = {
      status
    }

    if (queryParams.search) {
      const student = await Student.findOne({ studentId: queryParams.search })
      if (student) {
        query.studentId = student._id
      } else {
        query.studentId = null
      }
    }

    const forms = await FeeForm.find(query).populate('studentId').populate('departmentalFeeId')
      .populate('residentialFeeId')
      .populate('semesterFeeId');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = forms.filter((form: any) => {
      return String(form.studentId.hallId) === String(hallOperator.hallId)
    })

    return result
  }

  async getAllHallPayments(userId: string, queryParams: Record<string, unknown>) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const hallOperator = await Admin.findById(userId)
    if (!hallOperator) throw new CustomError(STATUS.NOT_FOUND, 'hallOperator is not found!', 'NOT_FOUND');

    const query: Record<string, unknown> = {
      status: {
        $in: [
          'approved_by_chairman',
          'rejected_by_chairman',
          'approved_by_hall_authority',
          'rejected_by_hall_authority',
          'approved_by_bank_accountant',
          'rejected_by_bank_accountant',
          'payment_completed',
          'approved_by_exam_controller',
          'rejected_by_exam_controller'
        ]
      }
    }

    if (queryParams.search) {
      const student = await Student.findOne({ studentId: queryParams.search })
      if (student) {
        query.studentId = student._id
      } else {
        query.studentId = null
      }
    }

    const forms = await FeeForm.find(query).populate('studentId').populate('departmentalFeeId')
      .populate('residentialFeeId')
      .populate('semesterFeeId')

    const result = forms.filter((form: any) => {

      return String(form.studentId.hallId) === String(hallOperator.hallId)
    }).filter((form: any) => form.residentialFeeId.totalResidentFee > 0)

    return result
  }

  async updateAndAccept(id: string, payload: Record<string, unknown>) {
    const forms = await FeeForm.findByIdAndUpdate(id, payload)
    return forms
  }

  async readOne(id: string) {
    return await FeeForm.findById(id).populate('studentId')
      .populate('departmentalFeeId')
      .populate('residentialFeeId')
      .populate('semesterFeeId')
      .populate('departmentId')
  }

  async acceptAll(payload: Record<string, unknown>) {
    const filter = { status: payload.oldStatus }
    const update = { status: payload.newStatus }

    return await FeeForm.updateMany(filter, update).populate('studentId')
      .populate('departmentalFeeId')
      .populate('residentialFeeId')
      .populate('semesterFeeId');
  }
}

const feeFormServices = new FeeFormServices();
export default feeFormServices;
