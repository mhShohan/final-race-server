import { Types } from 'mongoose';
import asyncHandler from '../../lib/asyncHandler';
import STATUS from '../../lib/httpStatus';
import sendResponse from '../../lib/sendResponse';
import Admin from '../admin/admin.model';
import Student from '../student/student.model';
import registrationInfoServices from './registrationInfo.services';

class RegistrationInfoControllers {
  private sendResponse = sendResponse;
  private STATUS = STATUS;
  private services = registrationInfoServices;
  private messageTitle = 'Registration Info';

  // Create
  create = asyncHandler(async (req, res) => {
    const result = await this.services.create(req.body);

    this.sendResponse(res, {
      success: true,
      statusCode: this.STATUS.CREATED,
      message: `${this.messageTitle} Created Successfully`,
      data: result,
    });
  });

  // update
  update = asyncHandler(async (req, res) => {
    const result = await this.services.update(req.params.id, req.body);

    this.sendResponse(res, {
      success: true,
      statusCode: this.STATUS.OK,
      message: `${this.messageTitle} updated Successfully`,
      data: result,
    });
  });

  // get one by id
  getSingle = asyncHandler(async (req, res) => {
    const result = await this.services.read(req.user._id);

    sendResponse(res, {
      success: true,
      statusCode: STATUS.OK,
      message: `${this.messageTitle} fetched Successfully`,
      data: result,
    });
  });

  // get one by id
  checkStatus = asyncHandler(async (req, res) => {
    let departmentId;

    if (req.user.role === 'STUDENT') {
      const student = await Student.findById(req.user._id);
      departmentId = student?.departmentId as Types.ObjectId;
    } else {
      const admin = await Admin.findById(req.user._id);
      departmentId = admin?.departmentId as Types.ObjectId;
    }

    const result = await this.services.checkStatus(departmentId as Types.ObjectId);

    sendResponse(res, {
      success: true,
      statusCode: STATUS.OK,
      message: `${this.messageTitle} status fetched Successfully`,
      data: result,
    });
  });
}

const registrationInfoControllers = new RegistrationInfoControllers();
export default registrationInfoControllers;
