import asyncHandler from "../../lib/asyncHandler";
import STATUS from "../../lib/httpStatus";
import sendResponse from "../../lib/sendResponse";
import bookServices from "./books.services";


class BookControllers {
  private sendResponse = sendResponse;
  private STATUS = STATUS;
  private services = bookServices;
  private messageTitle = 'Book';

  // Create
  create = asyncHandler(async (req, res) => {
    const result = await this.services.create(req.body, req.user._id);

    this.sendResponse(res, {
      success: true,
      statusCode: this.STATUS.CREATED,
      message: `${this.messageTitle} Created Successfully`,
      data: result,
    });
  });


  // get one by id
  getSingle = asyncHandler(async (req, res) => {
    const result = await this.services.read(req.params.id);

    sendResponse(res, {
      success: true,
      statusCode: STATUS.OK,
      message: `${this.messageTitle} fetched Successfully`,
      data: result,
    });
  });

  // get all
  getAll = asyncHandler(async (req, res) => {
    const result = await this.services.readAll(req.query);

    sendResponse(res, {
      success: true,
      statusCode: STATUS.OK,
      message: `${this.messageTitle} fetched Successfully`,
      data: result,
    });
  });

  // provide book
  provideBook = asyncHandler(async (req, res) => {
    const result = await this.services.provideBook(req.params.id, req.body);

    sendResponse(res, {
      success: true,
      statusCode: STATUS.OK,
      message: `${this.messageTitle} provide Successfully`,
      data: result,
    });
  });

  // borrowed Back
  borrowedBack = asyncHandler(async (req, res) => {
    const result = await this.services.borrowedBack(req.params.id, req.body);

    sendResponse(res, {
      success: true,
      statusCode: STATUS.OK,
      message: `${this.messageTitle} borrowed Back Successfully`,
      data: result,
    });
  });

  // borrowed Back
  getBookOfStudent = asyncHandler(async (req, res) => {
    const result = await this.services.getBookOfStudent(req.user._id);

    sendResponse(res, {
      success: true,
      statusCode: STATUS.OK,
      message: `${this.messageTitle} fetched Successfully`,
      data: result,
    });
  });
}

const bookControllers = new BookControllers();
export default bookControllers;
