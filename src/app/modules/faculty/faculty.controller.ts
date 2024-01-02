import asyncHandler from '../../lib/asyncHandler';
import STATUS from '../../lib/httpStatus';
import sendResponse from '../../lib/sendResponse';
import facultyServices from './faculty.services';

// Create
const createFaculty = asyncHandler(async (req, res) => {
  const result = await facultyServices.create(req.body);

  sendResponse(res, {
    success: true,
    statusCode: STATUS.CREATED,
    message: 'Faculty Created Successfully',
    data: result,
  });
});

// update
const updateFaculty = asyncHandler(async (req, res) => {
  const result = await facultyServices.update(req.params.id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: STATUS.OK,
    message: 'Faculty updated Successfully',
    data: result,
  });
});

// get one by id
const getSingleFaculty = asyncHandler(async (req, res) => {
  const result = await facultyServices.read(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: STATUS.OK,
    message: 'Faculty fetched Successfully',
    data: result,
  });
});

// get all
const getAllFaculties = asyncHandler(async (_req, res) => {
  const result = await facultyServices.readAll();

  sendResponse(res, {
    success: true,
    statusCode: STATUS.OK,
    message: 'All Faculties fetched Successfully',
    data: result,
  });
});

const facultyController = { createFaculty, updateFaculty, getSingleFaculty, getAllFaculties };

export default facultyController;
