import asyncHandler from '../../lib/asyncHandler';
import STATUS from '../../lib/httpStatus';
import sendResponse from '../../lib/sendResponse';
import feeFormServices from './feeForm.services';

class FeeFormControllers {
  private sendResponse = sendResponse;
  private STATUS = STATUS;
  private services = feeFormServices;
  private messageTitle = 'Fee From';

  // check application existence
  checkExistence = asyncHandler(async (req, res) => {
    const result = await this.services.checkExistence(req.user._id, req.query);

    this.sendResponse(res, {
      success: true,
      statusCode: this.STATUS.OK,
      message: `Your are going to apply for registration`,
      data: result,
    });
  });

  // Create
  create = asyncHandler(async (req, res) => {
    const result = await this.services.create(req.body, req.user._id);

    this.sendResponse(res, {
      success: true,
      statusCode: this.STATUS.CREATED,
      message: `${this.messageTitle} Created Successfully`,
      data: result,
    });
  });

  // get all
  getAll = asyncHandler(async (req, res) => {
    const result = await this.services.readAll(req.user, req.query);

    sendResponse(res, {
      success: true,
      statusCode: STATUS.OK,
      message: `${this.messageTitle} fetched Successfully`,
      data: result,
    });
  });

  // getAllByChairman
  getAllByChairman = asyncHandler(async (req, res) => {
    const result = await this.services.getAllByChairman(req.user._id, req.query);

    sendResponse(res, {
      success: true,
      statusCode: STATUS.OK,
      message: `${this.messageTitle} fetched Successfully`,
      data: result,
    });
  });

  // get All By hall
  getAllByHall = asyncHandler(async (req, res) => {
    const result = await this.services.getAllByHall(req.user._id, req.query);

    sendResponse(res, {
      success: true,
      statusCode: STATUS.OK,
      message: `${this.messageTitle} fetched Successfully`,
      data: result,
    });
  });

  // get All By Exam Controller
  getAllByExamController = asyncHandler(async (req, res) => {
    const result = await this.services.getAllByExamController(req.query);

    sendResponse(res, {
      success: true,
      statusCode: STATUS.OK,
      message: `${this.messageTitle} fetched Successfully`,
      data: result,
    });
  });

  // getAllByChairman
  updateAndAccept = asyncHandler(async (req, res) => {
    const payload = { status: req.body.status, declineMessage: req.body.declineMessage }

    const result = await this.services.updateAndAccept(req.params.id, payload);

    sendResponse(res, {
      success: true,
      statusCode: STATUS.OK,
      message: `${this.messageTitle} fetched Successfully`,
      data: result,
    });
  });

  // get single
  getSingle = asyncHandler(async (req, res) => {
    const result = await this.services.readOne(req.params.id);

    sendResponse(res, {
      success: true,
      statusCode: STATUS.OK,
      message: `${this.messageTitle} fetched Successfully`,
      data: result,
    });
  });
}

const feeFormControllers = new FeeFormControllers();
export default feeFormControllers;
