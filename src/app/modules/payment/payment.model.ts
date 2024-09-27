import { model, Schema, Types } from "mongoose";

interface IPayment {
  studentId: Types.ObjectId;
  departmentId: Types.ObjectId;
  hallId: Types.ObjectId;
  amount: number;
  bankAccountId: string;
  formId: Types.ObjectId;
}

const paymentSchema = new Schema<IPayment>({
  studentId: { type: Schema.Types.ObjectId, required: true, ref: 'student' },
  departmentId: { type: Schema.Types.ObjectId, ref: 'department' },
  hallId: { type: Schema.Types.ObjectId, ref: 'hall' },
  amount: { type: Number, required: true },
  bankAccountId: { type: String, required: true },
  formId: { type: Schema.Types.ObjectId, required: true, ref: 'fee_form' },
}, { timestamps: true });


const Payment = model<IPayment>('payment', paymentSchema);
export default Payment;