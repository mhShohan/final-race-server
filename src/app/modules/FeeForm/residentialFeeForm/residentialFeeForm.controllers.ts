import asyncHandler from '../../../lib/asyncHandler';
import STATUS from '../../../lib/httpStatus';
import sendResponse from '../../../lib/sendResponse';
import residentialFeeFormServices from './residentialFeeForm.services';

class ResidentialFeeFormControllers {
  private sendResponse = sendResponse;
  private STATUS = STATUS;
  private services = residentialFeeFormServices;
  private messageTitle = 'Residential Fee Form ';

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
    const result = await this.services.read(req.params.id);

    sendResponse(res, {
      success: true,
      statusCode: STATUS.OK,
      message: `${this.messageTitle} fetched Successfully`,
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

const residentialFeeFormControllers = new ResidentialFeeFormControllers();
export default residentialFeeFormControllers;
