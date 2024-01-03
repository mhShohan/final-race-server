import { Schema, model } from 'mongoose';
import { IHall } from './hall.interface';

const hallSchema = new Schema<IHall>(
  {
    name: { type: String, required: [true, 'Hall name is required!'], unique: true },
  },
  { timestamps: true },
);

const Hall = model<IHall>('hall', hallSchema);

export default Hall;
