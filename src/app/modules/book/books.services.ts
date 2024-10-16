import CustomError from "../../errorHandler/customError";
import STATUS from "../../lib/httpStatus";
import Admin from "../admin/admin.model";
import Student from "../student/student.model";
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
    return this.model.findById(id).populate('borrowedBy');
  }

  async readAll(queryParams: TPayload) {
    return this.model.find(queryParams);
  }

  async provideBook(bookId: string, body: TPayload) {
    const student = await Student.findOne({ studentId: body.studentId })
    if (!student) throw new CustomError(STATUS.NOT_FOUND, 'Student is not found!', 'NOT_FOUND')

    const book = await this.model.findById(bookId)
    if (book?.quantity === book?.borrowedBy.length) throw new CustomError(STATUS.BAD_REQUEST, 'All books are borrowed!')

    return this.model.findByIdAndUpdate(bookId, {
      $push: {
        borrowedBy: student._id
      }
    }, { new: true });
  }

  async borrowedBack(bookId: string, body: TPayload) {
    return this.model.findByIdAndUpdate(bookId, {
      $pull: {
        borrowedBy: body.studentId
      }
    }, { new: true });
  }

  async getBookOfStudent(id: string) {
    return this.model.find({
      borrowedBy: id
    })
  }


}

const paymentServices = new PaymentServices();
export default paymentServices;
