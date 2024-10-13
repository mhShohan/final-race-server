import CustomError from "../../errorHandler/customError";
import STATUS from "../../lib/httpStatus";
import Admin from "../admin/admin.model";
import Book from "./book.model";

type TPayload = Record<string, unknown>;

class PaymentServices {
  private model = Book;

  async create(body: TPayload, userId: string) {
    const admin = await Admin.findById(userId)
    if (!admin) throw new CustomError(STATUS.NOT_FOUND, 'Admin is not found!', 'NOT_FOUND')
    if (!admin.departmentId) throw new CustomError(STATUS.BAD_REQUEST, 'Admin does not belong to any department!')

    const payload = {
      departmentId: admin.departmentId,
      bookName: body.bookName,
      author: body.author,
      quantity: body.quantity,
    }

    return this.model.create(payload);
  }

  async read(id: string) {
    return this.model.findById(id);
  }

  async readAll(queryParams: TPayload) {
    return this.model.find(queryParams);
  }

}

const paymentServices = new PaymentServices();
export default paymentServices;
