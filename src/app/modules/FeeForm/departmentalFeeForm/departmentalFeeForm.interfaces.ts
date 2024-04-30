import { Types } from "mongoose";
import { TSemesters, TYears } from "../../../interfaces/interface";

export interface IDepartmentalFeeForm {
  departmentId: Types.ObjectId;
  studentId: Types.ObjectId;
  year: TYears
  semester: TSemesters;
  centerFee: number;
  association: number;
  developmentFee: number;
  amercementFee: number;
}


