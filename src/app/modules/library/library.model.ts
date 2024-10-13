import { model, Schema } from "mongoose";

interface ILibrary {
  departmentId: string;
  departmentName: string;
  departmentCode: string;
}

const librarySchema = new Schema({
  departmentId: { type: Schema.Types.ObjectId, ref: "department", required: true },
  departmentName: { type: String, required: true, trim: true },
  departmentCode: { type: String, required: true, trim: true },
}, { timestamps: true });


const Library = model<ILibrary>("library", librarySchema);
export default Library;