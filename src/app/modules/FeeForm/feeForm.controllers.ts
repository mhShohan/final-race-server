import asyncHandler from '../../lib/asyncHandler';
import STATUS from '../../lib/httpStatus';
import sendResponse from '../../lib/sendResponse';
import feeFormServices from './feeForm.services';

class FeeFormControllers {
  private sendResponse = sendResponse;
  private STATUS = STATUS;
  private services = feeFormServices;
  private messageTitle = 'Fee From';

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
  getAll = asyncHandler(async (_req, res) => {
    const result = await this.services.readAll();

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
