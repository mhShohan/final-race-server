import { Schema, model } from 'mongoose';
import { adminRole } from '../../constants/constants';
import { IAdmin } from './admin.interface';
import hashPassword from '../../utils/hashPassword';

const adminSchema = new Schema<IAdmin>(
  {
    name: {
      type: String,
      required: [true, 'Admin name is required!'],
    },
    email: {
      type: String,
      required: [true, 'Admin email is required!'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Admin password required!'],
      select: 0
    },
    hallId: {
      type: Schema.Types.ObjectId,
      ref: 'hall'
    },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: 'department'
    },
    role: {
      type: String,
      required: true,
      enum: adminRole,
    }
  },
  { timestamps: true },
);

adminSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await hashPassword(this.password)
  }

  next();
});

const Admin = model<IAdmin>('admin', adminSchema);

export default Admin;
