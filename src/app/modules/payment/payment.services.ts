import CustomError from "../../errorHandler/customError";
import STATUS from "../../lib/httpStatus";
import FeeForm from "../FeeForm/feeFrom.model";
import Student from "../student/student.model";
import Payment from "./payment.model";

type TPayload = Record<string, unknown>;

class PaymentServices {
  private model = Payment;

  async create(body: TPayload, userId: string) {
    const student = await Student.findById(userId);
    if (!student) throw new CustomError(STATUS.NOT_FOUND, 'Student is not found!', 'NOT_FOUND');

    const payload = {
      formId: body.formId,
      amount: body.amount,
      bankAccountId: body.backAccountId,
      studentId: student._id,
      departmentId: student.departmentId,
      hallId: student.hallId,
    }

    const payment = await this.model.create(payload);

    if (!payment) {
      throw new CustomError(STATUS.BAD_REQUEST, 'Payment is not created!', 'BAD_REQUEST');
    }

    await FeeForm.findByIdAndUpdate(body.formId, { status: 'payment_completed' });

    return payment;
  }

  async read(id: string) {
    return this.model.findById(id);
  }

  async readAll(queryParams: TPayload) {

    const query: Record<string, unknown> = {};

    if (queryParams.studentId) {
      query.studentId = queryParams.studentId;
    }

    if (queryParams.departmentId) {
      query.departmentId = queryParams.departmentId;
    }

    if (queryParams.hallId) {
      query.hallId = queryParams.hallId;
    }


    return this.model.find(query);
  }

}

const paymentServices = new PaymentServices();
export default paymentServices;
