import asyncHandler from '../../lib/asyncHandler';
import STATUS from '../../lib/httpStatus';
import sendResponse from '../../lib/sendResponse';
import courseServices from './course.services';

// Create
const create = asyncHandler(async (req, res) => {
  const result = await courseServices.create(req.body);

  sendResponse(res, {
    success: true,
    statusCode: STATUS.CREATED,
    message: 'Course Created Successfully',
    data: result,
  });
});

// update
const update = asyncHandler(async (req, res) => {
  const result = await courseServices.update(req.params.id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: STATUS.OK,
    message: 'Course updated Successfully',
    data: result,
  });
});

// get one by id
const getSingle = asyncHandler(async (req, res) => {
  const result = await courseServices.read(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: STATUS.OK,
    message: 'Course fetched Successfully',
    data: result[0],
  });
});

// get all
const getAll = asyncHandler(async (_req, res) => {
  const result = await courseServices.readAll();

  sendResponse(res, {
    success: true,
    statusCode: STATUS.OK,
    message: 'All Courses fetched Successfully',
    data: result,
  });
});

const courseControllers = { create, update, getSingle, getAll };

export default courseControllers;
