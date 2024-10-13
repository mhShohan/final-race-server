import { model, Schema, Types } from "mongoose";

interface IBook {
  libraryId: string;
  bookName: string;
  author: string;
  quantity: number;
  borrowedBy: Types.ObjectId[]
}

const bookSchema = new Schema({
  libraryId: { type: Schema.Types.ObjectId, ref: "library", required: true },
  author: { type: String, required: true, trim: true },
  bookName: { type: String, required: true, trim: true },
  quantity: { type: Number, required: true },
  borrowedBy: [ { type: Schema.Types.ObjectId, ref: "student" } ]
}, { timestamps: true });

const Book = model<IBook>("book", bookSchema);
export default Book; 
