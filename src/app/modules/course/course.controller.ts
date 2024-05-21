import { Types } from 'mongoose';
import asyncHandler from '../../lib/asyncHandler';
import STATUS from '../../lib/httpStatus';
import sendResponse from '../../lib/sendResponse';
import Student from '../student/student.model';
import courseServices from './course.services';
import Admin from '../admin/admin.model';

// Create
const create = asyncHandler(async (req, res) => {
  const result = await courseServices.create(req.body, req.user._id);

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
  const query: Record<string, unknown> = req.query;

  if (req?.user?._id) {
    if (req.user.role === 'STUDENT') {
      const student = await Student.findById(req.user._id);
      query.departmentId = student?.departmentId as Types.ObjectId;
    } else {
      const admin = await Admin.findById(req.user._id);
      if (admin?.departmentId) {
        query.departmentId = admin?.departmentId as Types.ObjectId;
      }
    }
  }

  const result = await courseServices.readAll(query);

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
