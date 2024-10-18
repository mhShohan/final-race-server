import asyncHandler from "../lib/asyncHandler";
import STATUS from "../lib/httpStatus";
import sendResponse from "../lib/sendResponse";
import DepartmentalFeeForm from "./FeeForm/departmentalFeeForm/departmentalFeeForm.model";
import FeeForm from "./FeeForm/feeFrom.model";
import ResidentialFeeForm from "./FeeForm/residentialFeeForm/residentialFeeForm.model";
import SemesterFee from "./FeeForm/semesterFeeForm/semesterFeeForm.model";
import Payment from "./payment/payment.model";

const cleanUpApplication = asyncHandler(async (req, res) => {

  if (req.query.password !== 'mhs') {
    return sendResponse(res, {
      success: false,
      statusCode: STATUS.BAD_REQUEST,
      message: `Invalid Secret Key`,
      data: null,
    });
  }

  await FeeForm.deleteMany({});
  await DepartmentalFeeForm.deleteMany({});
  await ResidentialFeeForm.deleteMany({});
  await SemesterFee.deleteMany({});
  await Payment.deleteMany({});

  sendResponse(res, {
    success: true,
    statusCode: STATUS.OK,
    message: `Application Cleanup Successfully`,
    data: null,
  });
});

export default cleanUpApplication;