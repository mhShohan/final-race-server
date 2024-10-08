import asyncHandler from '../../lib/asyncHandler';
import STATUS from '../../lib/httpStatus';
import sendResponse from '../../lib/sendResponse';
import adminServices from './admin.services';

// Create
const create = asyncHandler(async (req, res) => {
  const result = await adminServices.create(req.body);

  sendResponse(res, {
    success: true,
    statusCode: STATUS.CREATED,
    message: 'Admin Created Successfully',
    data: result,
  });
});

// update
const update = asyncHandler(async (req, res) => {
  const result = await adminServices.update(req.params.id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: STATUS.OK,
    message: 'Admin updated Successfully',
    data: result,
  });
});

// get one by id
const getSingle = asyncHandler(async (req, res) => {
  const result = await adminServices.read(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: STATUS.OK,
    message: 'Admin fetched Successfully',
    data: result[0],
  });
});

// get all
const getAll = asyncHandler(async (_req, res) => {
  const result = await adminServices.readAll();

  sendResponse(res, {
    success: true,
    statusCode: STATUS.OK,
    message: 'All Admins fetched Successfully',
    data: result,
  });
});

// login
const login = asyncHandler(async (req, res) => {
  const result = await adminServices.login(req.body);

  sendResponse(res, {
    success: true,
    statusCode: STATUS.OK,
    message: 'Admin login Successfully',
    data: result,
  });
});

// allStudents of department
const allStudents = asyncHandler(async (req, res) => {
  const result = await adminServices.getAllStudent(req.user._id);

  sendResponse(res, {
    success: true,
    statusCode: STATUS.OK,
    message: 'All student fetched Successfully',
    data: result,
  });
});

const reviewRequest = asyncHandler(async (req, res) => {
  const result = await adminServices.reviewRequest(req.user._id);

  sendResponse(res, {
    success: true,
    statusCode: STATUS.OK,
    message: 'All student fetched Successfully',
    data: result,
  });
});

const verifyStudentRequest = asyncHandler(async (req, res) => {
  await adminServices.verifyStudentRequest(req.user._id, req.params.id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: STATUS.OK,
    message: 'Verified Successfully',
    data: {},
  });
});

const adminControllers = {
  create,
  update,
  getSingle,
  getAll,
  login,
  allStudents,
  reviewRequest,
  verifyStudentRequest,
};

export default adminControllers;
