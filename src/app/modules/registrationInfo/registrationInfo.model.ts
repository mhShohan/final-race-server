import { Schema, model } from 'mongoose';
import { IRegistrationInfo } from './registrationInfo.interface';

const RegistrationInfoSchema: Schema = new Schema<IRegistrationInfo>(
  {
    facultyId: { type: Schema.Types.ObjectId, required: true },
    departmentId: { type: Schema.Types.ObjectId, required: true },
    tuitionFee: { type: Number, required: true, default: 0 },
    transport: { type: Number, required: true, default: 0 },
    library: { type: Number, required: true, default: 0 },
    centralSports: { type: Number, required: true, default: 0 },
    studentWelfare: { type: Number, required: true, default: 0 },
    treatment: { type: Number, required: true, default: 0 },
    roverScout: { type: Number, required: true, default: 0 },
    BNCC: { type: Number, required: true, default: 0 },
    computerFee: { type: Number, required: true, default: 0 },
    semesterExamFee: { type: Number, required: true, default: 0 },
    admitCard: { type: Number, required: true, default: 0 },
    othersFee: { type: Number, required: true, default: 0 },
    centerFee: { type: Number, required: true, default: 0 },
    association: { type: Number, required: true, default: 0 },
    developmentFee: { type: Number, required: true, default: 0 },
    startDate: { type: String },
    endDate: { type: String },
  },
  { timestamps: true },
);

const RegistrationInfo = model<IRegistrationInfo>('RegistrationInfo', RegistrationInfoSchema);
export default RegistrationInfo;
