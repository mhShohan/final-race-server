import asyncHandler from '../../lib/asyncHandler';
import STATUS from '../../lib/httpStatus';
import sendResponse from '../../lib/sendResponse';
import hallServices from './hall.services';

// Create
const create = asyncHandler(async (req, res) => {
  const result = await hallServices.create(req.body);

  sendResponse(res, {
    success: true,
    statusCode: STATUS.CREATED,
    message: 'Hall Created Successfully',
    data: result,
  });
});

// update
const update = asyncHandler(async (req, res) => {
  const result = await hallServices.update(req.params.id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: STATUS.OK,
    message: 'Hall updated Successfully',
    data: result,
  });
});

// get one by id
const getSingle = asyncHandler(async (req, res) => {
  const result = await hallServices.read(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: STATUS.OK,
    message: 'Hall fetched Successfully',
    data: result,
  });
});

// get all
const getAll = asyncHandler(async (_req, res) => {
  const result = await hallServices.readAll();

  sendResponse(res, {
    success: true,
    statusCode: STATUS.OK,
    message: 'All Halls fetched Successfully',
    data: result,
  });
});

const hallController = { create, update, getSingle, getAll };

export default hallController;
