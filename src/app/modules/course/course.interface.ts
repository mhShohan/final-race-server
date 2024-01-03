import { Types } from "mongoose";
import { IAcademicType, ISemesters, IYears } from "../../interfaces/interface";

export interface ICourse {
  title: string;
  code: string
  credit: number
  facultyId: Types.ObjectId
  departmentId: Types.ObjectId
  year: IYears
  semester: ISemesters
  type: IAcademicType
}

