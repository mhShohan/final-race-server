import asyncHandler from '../../lib/asyncHandler';
import STATUS from '../../lib/httpStatus';
import sendResponse from '../../lib/sendResponse';
import departmentServices from './department.services';

// Create
const create = asyncHandler(async (req, res) => {
  const result = await departmentServices.create(req.body);

  sendResponse(res, {
    success: true,
    statusCode: STATUS.CREATED,
    message: 'Department Created Successfully',
    data: result,
  });
});

// update
const update = asyncHandler(async (req, res) => {
  const result = await departmentServices.update(req.params.id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: STATUS.OK,
    message: 'Department updated Successfully',
    data: result,
  });
});

// get one by id
const getSingle = asyncHandler(async (req, res) => {
  const result = await departmentServices.read(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: STATUS.OK,
    message: 'Department fetched Successfully',
    data: result[0],
  });
});

// get all
const getAll = asyncHandler(async (_req, res) => {
  const result = await departmentServices.readAll();

  sendResponse(res, {
    success: true,
    statusCode: STATUS.OK,
    message: 'All Departments fetched Successfully',
    data: result,
  });
});

const departmentController = { create, update, getSingle, getAll };

export default departmentController;
