/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ZodError } from 'zod';
import mongoose from 'mongoose';
import { ErrorRequestHandler } from 'express';

const globalErrorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const errorResponse = {
    success: false,
    statusCode: 500,
    message: 'Internal Server Error!',
    errors: {},
  };

  return res.status(errorResponse.statusCode).json(errorResponse);
};

export default globalErrorHandler;
