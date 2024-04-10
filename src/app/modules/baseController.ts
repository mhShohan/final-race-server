import STATUS from '../lib/httpStatus';
import sendResponse from '../lib/sendResponse';

class BaseController {
  private sendResponse = sendResponse;
  private STATUS = STATUS;
  private messageTitle: string;

  constructor(messageTitle: string) {
    this.messageTitle = messageTitle
    this.sendResponse = sendResponse
    this.STATUS = STATUS
  }
}

export default BaseController;
