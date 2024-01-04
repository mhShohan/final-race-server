import { Types } from "mongoose";
import { TAcademicType, TSemesters, TYears } from "../../interfaces/interface";

export interface ICourse {
  title: string;
  code: string
  credit: number
  facultyId: Types.ObjectId
  departmentId: Types.ObjectId
  year: TYears
  semester: TSemesters
  type: TAcademicType
}

