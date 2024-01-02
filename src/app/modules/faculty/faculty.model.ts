import { Schema, model } from 'mongoose';
import { IFaculty } from './faculty.interface';

const facultySchema = new Schema<IFaculty>(
  {
    name: { type: String, required: [true, 'Name is required!'], unique: true },
  },
  { timestamps: true },
);

const Faculty = model<IFaculty>('faculty', facultySchema);

export default Faculty;
