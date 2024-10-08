import asyncHandler from '../../lib/asyncHandler';
import STATUS from '../../lib/httpStatus';
import sendResponse from '../../lib/sendResponse';
import studentServices from './student.services';

// Create --- register new student
const create = asyncHandler(async (req, res) => {
  const result = await studentServices.create(req.body);

  sendResponse(res, {
    success: true,
    statusCode: STATUS.CREATED,
    message: 'Student Created Successfully',
    data: result,
  });
});

// update
const update = asyncHandler(async (req, res) => {
  const result = await studentServices.update(req.params.id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: STATUS.OK,
    message: 'Student updated Successfully',
    data: result,
  });
});

// get one by id
const getSingle = asyncHandler(async (req, res) => {
  const result = await studentServices.read(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: STATUS.OK,
    message: 'Student fetched Successfully',
    data: result[0],
  });
});

// get all
const getAll = asyncHandler(async (_req, res) => {
  const result = await studentServices.readAll();

  sendResponse(res, {
    success: true,
    statusCode: STATUS.OK,
    message: 'All Students fetched Successfully',
    data: result,
  });
});

// get self profile
const getSelf = asyncHandler(async (req, res) => {
  const result = await studentServices.read(req.user._id);

  sendResponse(res, {
    success: true,
    statusCode: STATUS.OK,
    message: 'All Students fetched Successfully',
    data: result[0],
  });
});

// login
const login = asyncHandler(async (req, res) => {
  const result = await studentServices.login(req.body);

  sendResponse(res, {
    success: true,
    statusCode: STATUS.OK,
    message: 'Student login Successfully',
    data: result,
  });
});

// verifyAccountRequest
const verifyAccountRequest = asyncHandler(async (req, res) => {
  const result = await studentServices.verifyAccountRequest(req.user._id);

  sendResponse(res, {
    success: true,
    statusCode: STATUS.OK,
    message: 'Your profile is requested to review by department',
    data: result,
  });
});

const studentControllers = {
  create,
  update,
  getSingle,
  getAll,
  login,
  getSelf,
  verifyAccountRequest,
};
export default studentControllers;
