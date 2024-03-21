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
const getAll = asyncHandler(async (req, res) => {
  const result = await courseServices.readAll(req.query);

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  sendResponse(res, {
    success: true,
    statusCode: STATUS.OK,
    message: 'All Courses fetched Successfully',
    meta: {
      page,
      limit,
      totalPage: Math.ceil(result.total[0]?.total / limit),
      totalCount: result.total[0]?.total || 0,
    },
    data: result.data,
  });
});

const courseControllers = { create, update, getSingle, getAll };

export default courseControllers;
